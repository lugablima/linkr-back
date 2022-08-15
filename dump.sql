--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name text NOT NULL,
    "useCount" integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.hashtags OWNER TO postgres;

--
-- Name: hashtagsPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."hashtagsPosts" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."hashtagsPosts" OWNER TO postgres;

--
-- Name: hashtagsPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."hashtagsPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."hashtagsPosts_id_seq" OWNER TO postgres;

--
-- Name: hashtagsPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."hashtagsPosts_id_seq" OWNED BY public."hashtagsPosts".id;


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hashtags_id_seq OWNER TO postgres;

--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likedPosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."likedPosts" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."likedPosts" OWNER TO postgres;

--
-- Name: likedPosts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."likedPosts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."likedPosts_id_seq" OWNER TO postgres;

--
-- Name: likedPosts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."likedPosts_id_seq" OWNED BY public."likedPosts".id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    link text NOT NULL,
    description text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    "pictureURL" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: hashtagsPosts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagsPosts" ALTER COLUMN id SET DEFAULT nextval('public."hashtagsPosts_id_seq"'::regclass);


--
-- Name: likedPosts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPosts" ALTER COLUMN id SET DEFAULT nextval('public."likedPosts_id_seq"'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags (id, name, "useCount", "createdAt") FROM stdin;
4	qualidade	3	2022-08-14 22:48:33.417576
5	sql	3	2022-08-14 22:48:33.424364
6	estudar	2	2022-08-14 22:48:33.425132
\.


--
-- Data for Name: hashtagsPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."hashtagsPosts" (id, "postId", "hashtagId", "createdAt") FROM stdin;
4	14	4	2022-08-14 22:48:33.425803
5	14	5	2022-08-14 22:48:33.436609
6	14	6	2022-08-14 22:48:33.448291
7	15	4	2022-08-14 22:49:45.093554
8	15	6	2022-08-14 22:49:45.115249
9	15	5	2022-08-14 22:49:45.117252
10	16	4	2022-08-14 22:50:47.407291
11	16	5	2022-08-14 22:50:47.439845
\.


--
-- Data for Name: likedPosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."likedPosts" (id, "userId", "postId", "createdAt") FROM stdin;
1	1	7	2022-08-11 19:28:10.5669
3	3	7	2022-08-11 19:31:46.690669
6	4	7	2022-08-11 19:37:56.847959
235	2	8	2022-08-13 21:26:24.737909
236	2	7	2022-08-13 21:26:32.679986
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, "userId", link, description, "createdAt") FROM stdin;
7	2	https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/	Artigo interessante #AsyncAwait	2022-08-11 19:18:31.588481
8	2	https://dba.stackexchange.com/questions/293868/how-to-use-order-by-and-limit-inside-json-agg	Artigo mega interessante	2022-08-11 19:19:49.619615
9	2	https://www.postgresql.org/docs/9.1/functions-math.html	SQL é massa demais!	2022-08-11 19:20:59.430615
14	1	https://www.postgresql.org/docs/9.1/functions-math.html	Outro post de qualidade! #Qualidade #SQL #ESTUDAR	2022-08-14 22:48:33.382815
15	1	https://www.postgresql.org/docs/9.1/functions-math.html	Um post de qualidade! #Qualidade #SQL #ESTUDAR	2022-08-14 22:49:45.036587
16	1	https://www.postgresql.org/docs/9.1/functions-math.html	Um post! #Qualidade #SQL	2022-08-14 22:50:47.356636
17	1	https://www.postgresql.org/docs/9.1/functions-math.html	Um post normal!	2022-08-14 22:51:56.919873
18	1	https://www.postgresql.org/docs/9.1/functions-math.html	\N	2022-08-14 22:52:41.721246
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, username, "pictureURL", "createdAt") FROM stdin;
1	joao@email.com	$2a$10$AIpfkqmXO9lFoPln1jSjrOfaoMn8QA.UvgdYjPfd1NSKTC5wCBJZm	joao	http://www.	2022-08-10 23:17:11.473862
2	jonas@email.com	$2a$10$ZTprnMa6HG19zfn4Pj2h/OGQP5EKwIOnqywAl1C/ZeknIJZGXCloi	jonas	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:23:43.227158
3	jose@email.com	$2a$10$er3xIh1SeOJo7ttvUPiVg..cfkLoR01bGcgvLL6vFCKSU5zCGsSka	jose	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:24:50.117553
4	jose_almeida@email.com	$2a$10$RIzlKtQbfu/PaDl/GiYgXO0JOAdJ1MHbvG3NRgRgHKfHvIFoZRG3e	jose_almeida	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:36:50.233121
\.


--
-- Name: hashtagsPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."hashtagsPosts_id_seq"', 11, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 6, true);


--
-- Name: likedPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."likedPosts_id_seq"', 236, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: hashtagsPosts hashtagsPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagsPosts"
    ADD CONSTRAINT "hashtagsPosts_pkey" PRIMARY KEY (id);


--
-- Name: hashtags hashtags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_name_key UNIQUE (name);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likedPosts likedPosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPosts"
    ADD CONSTRAINT "likedPosts_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: hashtagsPosts hashtagsPosts_hashtagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagsPosts"
    ADD CONSTRAINT "hashtagsPosts_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: hashtagsPosts hashtagsPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."hashtagsPosts"
    ADD CONSTRAINT "hashtagsPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likedPosts likedPosts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPosts"
    ADD CONSTRAINT "likedPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likedPosts likedPosts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."likedPosts"
    ADD CONSTRAINT "likedPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

