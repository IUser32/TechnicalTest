# Generated by Django 2.1.2 on 2018-10-19 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='stock',
            field=models.DecimalField(decimal_places=0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='movie',
            name='year',
            field=models.DecimalField(decimal_places=0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='rentmovie',
            name='cost',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=9),
        ),
    ]
