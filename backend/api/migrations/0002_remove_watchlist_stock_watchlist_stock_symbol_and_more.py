# Generated by Django 5.0.6 on 2024-05-15 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='watchlist',
            name='stock',
        ),
        migrations.AddField(
            model_name='watchlist',
            name='stock_symbol',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.DeleteModel(
            name='StockSymbol',
        ),
    ]
