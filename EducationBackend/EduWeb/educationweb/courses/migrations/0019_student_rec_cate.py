# Generated by Django 5.0.7 on 2024-09-25 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0018_remove_student_interesting_cate'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='rec_cate',
            field=models.ManyToManyField(blank=True, to='courses.category'),
        ),
    ]
