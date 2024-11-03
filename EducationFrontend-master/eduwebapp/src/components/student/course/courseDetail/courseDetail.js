import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { Form, Outlet, useNavigate, useParams } from "react-router-dom";
import { authAPI, endpoints } from "../../../../configs/APIs";
import { ChapterDetail } from "../chapter/chapterDetail/chapterDeatil";
import { Sidebar } from "../sideBar/sideBar";
import { TopBar } from "../topBar/topBar";
import { Button } from "react-bootstrap";
import { Star } from "lucide-react";

export const CourseDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [course, setCourse] = useState(null);
  console.log("Tesst", course);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  console.log(rating);
  const [listCmt, setListCmt] = useState(null);
  const [listRating, setListRating] = useState(null);

  const navToFeed = () => {
    nav("/stuwall");
  };

  const loadCourseDetails = async () => {
    let res = await authAPI().get(endpoints["get_detail_course"](id));
    setCourse(res.data);
  };

  useEffect(() => {
    loadCourseDetails();
  }, [id]);

  const handleChapterSelect = (chapter) => {
    nav(`/stuwall/course/${id}/chapter/${chapter.id}`);
  };

  const handleStarClick = async (index) => {
    const newRating = index + 1;
    setRating(newRating);
  };
  const updateRating = async (id) => {
    try {
      let res = await authAPI().patch(endpoints["update_rating"](id), {
        rate: rating,
      });
      loadRating();
    } catch (ex) {
      console.error(ex);
    }
  };

  const addRating = async () => {
    try {
      let res = await authAPI().post(endpoints["add_rating"](course.id), {
        rate: rating,
      });
      if (res.status === 200) updateRating(res.data.id);
      loadRating();
    } catch (ex) {
      console.error(ex);
    }
  };
  const updateComment = async (id) => {
    try {
      let res = await authAPI().patch(endpoints["update_comment"](id), {
        content: comment,
      });
      setComment("");
      loadCmt();
    } catch (ex) {
      console.error(ex);
    }
  };

  const addCmt = async () => {
    try {
      let res = await authAPI().post(endpoints["add_cmt"](course.id), {
        content: comment,
      });
      if (res.status === 200) updateComment(res.data.id);
      setComment("");
      loadCmt();
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadCmt = async () => {
    try {
      let res = await authAPI().get(endpoints["get_cmt"](id));
      setListCmt(res.data);
      console.info(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadRating = async () => {
    try {
      let res = await authAPI().get(endpoints["get_rating"](id));
      setListRating(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    loadCmt();
    loadRating();
  }, [id]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
        onClick={() => handleStarClick(index)}
      >
        <Star size={20} />
      </span>
    ));
  };

  const handleSubmit = async () => {
    if (rating > 0) {
      await addRating();
    }
    if (comment.trim()) {
      await addCmt();
    }
  };

  const renderCombined = () => {
    if (!listRating || !listCmt) return null;

    const combinedData = listRating.map((rating) => {
      const studentComment = listCmt.find(
        (comment) => comment.student.id === rating.student.id
      );
      return { rating, comment: studentComment };
    });

    return combinedData.map(({ rating, comment }) => (
      <div key={rating.id} className="combined-item">
        <div className="combined-header">
          <img
            src={rating.student.user.avatar}
            alt="avatar"
            className="avatar-circle"
          />
          <span className="user-name">
            {rating.student.user.first_name} {rating.student.user.last_name}
          </span>
        </div>
        {comment && <p className="comment-content">{comment.content}</p>}
        <div className="flex justify-between">
          <div className="rating-stars">{renderStars(rating.rate)}</div>
          <span className="rating-time italic">{rating.create_date}</span>
        </div>
      </div>
    ));
  };
  const navToPro4Teacher = (id) => {
    nav("/profile_teacher", { state: { id } });
  };

  return (
    <div className="course-container">
      <Sidebar course={course} handleChapterSelect={handleChapterSelect} />
      <div className="content">
        <TopBar navToFeed={navToFeed} />
        <div className="main-content">
          {window.location.pathname.includes("chapter") ? (
            <Outlet />
          ) : (
            <div className="course-description">
              <div className="course-card-image-wrapper">
                <img
                  className="course-card-image"
                  alt={course?.title}
                  src={course?.thumbnail}
                />
              </div>

              <h1>{course?.title}</h1>

              <p>{course?.description}</p>
              <hr />

              <h2 className="mt-8">Instructor</h2>
              <div className="teacher-info">
                <img
                  src={course?.teacher.user.avatar}
                  alt="avatar"
                  className="avatar-instructor"
                />

                <div>
                  <Button
                    onClick={() => navToPro4Teacher(course?.teacher.id)}
                    className="custom-button"
                  >
                    {course?.teacher.user.first_name}{" "}
                    {course?.teacher.user.last_name}
                  </Button>
                  <br />

                  <div className="qualification-instructor">
                    {course?.teacher.user.qualification}
                  </div>
                </div>
              </div>

              <h2 className="rating-detail">Rating and Comment</h2>

              <h3 className="text-center mt-4">How is your course?</h3>
              <span className="text-center block text-slate-400 text-2xl">
                Please take a moment to rate and review...
              </span>

              <div className="rating-container">{renderStars(rating)}</div>
              <div className="input-review">
                <textarea
                  placeholder="Enter your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="btn-box">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn-review"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <div className="combined-section">{renderCombined()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
