# Generated by Django 3.1.3 on 2021-01-30 16:08

from django.db import migrations, models
import django.db.models.deletion
import parler.fields
import parler.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actualite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.TextField()),
                ('heure', models.TextField()),
                ('details', models.TextField()),
            ],
            options={
                'db_table': 'actualite',
            },
        ),
        migrations.CreateModel(
            name='Langue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intial', models.TextField()),
                ('classe', models.IntegerField()),
                ('type_contenue', models.TextField()),
                ('sens_lecture', models.TextField()),
            ],
            options={
                'db_table': 'langue',
            },
        ),
        migrations.CreateModel(
            name='Predication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.IntegerField(default=1)),
            ],
            options={
                'abstract': False,
            },
            bases=(parler.models.TranslatableModelMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Titre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.TextField()),
                ('nombre', models.TextField()),
            ],
            options={
                'db_table': 'titre',
            },
        ),
        migrations.CreateModel(
            name='Verset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.IntegerField()),
                ('contenue', models.TextField()),
                ('id_parab', models.TextField()),
                ('id_langue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.langue')),
                ('id_pred', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.predication')),
            ],
            options={
                'db_table': 'verset',
            },
            bases=(parler.models.TranslatableModelMixin, models.Model),
        ),
        migrations.CreateModel(
            name='PredicationTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('titre', models.CharField(blank=True, max_length=255, null=True)),
                ('nom_pred', models.TextField(blank=True, null=True)),
                ('sous_titre', models.TextField(blank=True, null=True)),
                ('nom_audio', models.TextField(blank=True, null=True)),
                ('lien_audio', models.TextField(blank=True, null=True)),
                ('duree', models.IntegerField(blank=True, default=0, null=True)),
                ('lien_video', models.TextField(blank=True, null=True)),
                ('master', parler.fields.TranslationsForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='app.predication')),
            ],
            options={
                'verbose_name': 'predication Translation',
                'db_table': 'app_predication_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
            bases=(parler.models.TranslatedFieldsModelMixin, models.Model),
        ),
    ]
