﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WordWanderBackend.Main.DAL;

#nullable disable

namespace WordWanderBackend.Main.DAL.Migrations
{
    [DbContext(typeof(MainDbContext))]
    [Migration("20230620144201_FavoriteTranslation")]
    partial class FavoriteTranslation
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.BookDbModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<double>("CurrentPercent")
                        .HasColumnType("double precision");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Extension")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SourceLanguageCode")
                        .HasColumnType("text");

                    b.Property<string>("TargetLanguageCode")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.DictionaryDbModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("BookId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DefaultLanguage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DefaultSequnce")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Favourite")
                        .HasColumnType("boolean");

                    b.Property<string>("TranslatedLangauge")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TranslatedSequence")
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Dictionary");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.UserDbModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PrefferedApi")
                        .HasColumnType("integer");

                    b.Property<int>("PrefferedColorTheme")
                        .HasColumnType("integer");

                    b.Property<int>("PrefferedFontSize")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasDefaultValue(12);

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.BookDbModel", b =>
                {
                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", "User")
                        .WithMany("Books")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.DictionaryDbModel", b =>
                {
                    b.HasOne("WordWanderBackend.Main.DAL.Models.BookDbModel", "Book")
                        .WithMany("Dictionary")
                        .HasForeignKey("BookId");

                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", "User")
                        .WithMany("Dictionary")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.BookDbModel", b =>
                {
                    b.Navigation("Dictionary");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.UserDbModel", b =>
                {
                    b.Navigation("Books");

                    b.Navigation("Dictionary");
                });
#pragma warning restore 612, 618
        }
    }
}
