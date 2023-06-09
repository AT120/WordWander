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
    [Migration("20230619111821_inviteFunctional")]
    partial class inviteFunctional
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("GroupDbModelUserDbModel", b =>
                {
                    b.Property<Guid>("StudentsId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserGroupsId")
                        .HasColumnType("uuid");

                    b.HasKey("StudentsId", "UserGroupsId");

                    b.HasIndex("UserGroupsId");

                    b.ToTable("GroupStudents", (string)null);
                });

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
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("TargetLanguageCode")
                        .IsRequired()
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

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.GroupDbModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("TeacherId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("TeacherId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.InvitationDbModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("InvitedId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("InviterId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("InvitedId");

                    b.HasIndex("InviterId");

                    b.ToTable("Invations");
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

            modelBuilder.Entity("GroupDbModelUserDbModel", b =>
                {
                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", null)
                        .WithMany()
                        .HasForeignKey("StudentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WordWanderBackend.Main.DAL.Models.GroupDbModel", null)
                        .WithMany()
                        .HasForeignKey("UserGroupsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.GroupDbModel", b =>
                {
                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", "Teacher")
                        .WithMany("TeacherGroups")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.InvitationDbModel", b =>
                {
                    b.HasOne("WordWanderBackend.Main.DAL.Models.GroupDbModel", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", "Invited")
                        .WithMany("Invations")
                        .HasForeignKey("InvitedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WordWanderBackend.Main.DAL.Models.UserDbModel", "Inviter")
                        .WithMany()
                        .HasForeignKey("InviterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");

                    b.Navigation("Invited");

                    b.Navigation("Inviter");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.BookDbModel", b =>
                {
                    b.Navigation("Dictionary");
                });

            modelBuilder.Entity("WordWanderBackend.Main.DAL.Models.UserDbModel", b =>
                {
                    b.Navigation("Books");

                    b.Navigation("Dictionary");

                    b.Navigation("Invations");

                    b.Navigation("TeacherGroups");
                });
#pragma warning restore 612, 618
        }
    }
}
