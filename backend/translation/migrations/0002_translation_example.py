# Generated by Django 2.2.5 on 2019-09-14 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('translation', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='translation',
            name='example',
            field=models.TextField(null=True),
        ),
    ]