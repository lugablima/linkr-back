CREATE DATABASE linkr;

CREATE TABLE users (
	id SERIAL NOT NULL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	username TEXT NOT NULL UNIQUE,
	"pictureURL" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW() 
);

CREATE TABLE posts (
	id SERIAL NOT NULL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	link TEXT NOT NULL,
	description TEXT,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags (
	id SERIAL NOT NULL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	"useCount" INTEGER NOT NULL DEFAULT 1,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtagsPosts" (
	id SERIAL NOT NULL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES posts(id),
	"hashtagId" INTEGER NOT NULL REFERENCES hashtags(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "likedPosts" (
	id SERIAL NOT NULL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"postId" INTEGER NOT NULL REFERENCES posts(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE followers (
	id SERIAL NOT NULL PRIMARY KEY,
	"followerId" INTEGER NOT NULL REFERENCES users(id),
	"followingId" INTEGER NOT NULL REFERENCES users(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
	id SERIAL NOT NULL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES posts(id),
	"userId" INTEGER NOT NULL REFERENCES users(id),
	comment TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE reposts (
	id SERIAL NOT NULL PRIMARY KEY,
	"postId" INTEGER NOT NULL REFERENCES posts(id),
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
