# Generated by Django 2.2.10 on 2020-04-10 06:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200410_0117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attribute',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
        ),
    ]
