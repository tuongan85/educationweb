# Generated by Django 5.0.7 on 2024-08-06 05:57

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_remove_course_resource_alter_course_thumbnail_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='active',
        ),
        migrations.RemoveField(
            model_name='course',
            name='length',
        ),
        migrations.AddField(
            model_name='course',
            name='publish',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='course',
            name='thumbnail',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='thumbnail'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='resource',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='resource'),
        ),
    ]