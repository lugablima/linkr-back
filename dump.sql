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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    comment text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.followers OWNER TO postgres;

--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.followers_id_seq OWNER TO postgres;

--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


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
-- Name: reposts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reposts OWNER TO postgres;

--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reposts_id_seq OWNER TO postgres;

--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


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
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


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
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, "postId", "userId", comment, "createdAt") FROM stdin;
1	19	5	Muito legal esse artigo!	2022-08-18 17:23:48.512467
2	19	1	Também achei!	2022-08-18 17:25:48.906482
3	19	2	Muito bom!	2022-08-18 17:26:32.878817
4	19	3	Muitoo legal, nossa!	2022-08-18 17:28:02.840868
5	19	4	Que demaisss!	2022-08-18 17:29:00.147077
6	19	5	Galera, bora bootbar?	2022-08-19 11:29:54.086326
7	17	5	ISSO ÁI JOÃO!	2022-08-19 11:38:25.671417
8	17	5	E AEEEE	2022-08-19 11:46:15.088325
9	17	5	Uĺtimo comentário	2022-08-19 11:49:40.958904
10	17	5	ÚLTIMO	2022-08-19 14:03:54.746295
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.followers (id, "followerId", "followingId", "createdAt") FROM stdin;
1	5	1	2022-08-18 17:51:42.960157
2	5	2	2022-08-18 17:51:54.218989
3	5	4	2022-08-18 18:10:51.989327
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags (id, name, "useCount", "createdAt") FROM stdin;
4	qualidade	3	2022-08-14 22:48:33.417576
32	eslint	1	2022-08-18 16:33:11.127605
33	relembrar	1	2022-08-19 17:16:05.867571
7	git	3	2022-08-16 10:22:43.6284
5	sql	3	2022-08-14 22:48:33.424364
34	última	1	2022-08-19 17:19:11.847703
8	autenticação	2	2022-08-16 10:22:43.629599
6	estudar	2	2022-08-14 22:48:33.425132
35	foi	1	2022-08-19 18:22:08.122587
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
12	19	7	2022-08-16 10:22:43.679
13	19	8	2022-08-16 10:22:43.680228
42	32	32	2022-08-18 16:33:11.200098
43	37	33	2022-08-19 17:16:05.906436
44	38	34	2022-08-19 17:19:11.856123
45	39	7	2022-08-19 17:21:25.221334
46	40	8	2022-08-19 17:23:52.846669
47	41	7	2022-08-19 17:33:52.455907
48	51	35	2022-08-19 18:22:08.160353
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
260	5	19	2022-08-18 14:16:27.061501
262	5	32	2022-08-18 21:46:59.958249
263	5	8	2022-08-19 11:18:25.792956
266	5	18	2022-08-19 11:30:09.033311
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
19	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Importante! #Git #Autenticação	2022-08-16 10:22:43.529776
49	5	https://www.npmjs.com/package/use-interval	POR FAVOR	2022-08-19 18:18:08.971433
50	5	https://www.npmjs.com/package/use-interval	UseInterval	2022-08-19 18:20:39.933649
51	5	https://www.npmjs.com/package/use-interval	Será que foi? #foi	2022-08-19 18:22:08.0876
52	5	https://www.npmjs.com/package/use-interval	pelo jeito foi	2022-08-19 18:24:19.98436
53	5	https://www.npmjs.com/package/use-interval	Último teste	2022-08-19 18:25:02.050714
32	5	https://www.freecodecamp.org/news/what-is-linting-and-how-can-it-save-you-time/	Grande ferramenta #Eslint	2022-08-18 16:33:10.901501
33	5	https://www.devmedia.com.br/trabalhando-com-subqueries/40134	Esse é recente	2022-08-19 14:50:54.899429
34	5	https://www.devmedia.com.br/trabalhando-com-subqueries/40134	Esse também	2022-08-19 14:51:04.02334
35	5	https://www.devmedia.com.br/trabalhando-com-subqueries/40134	Esse é o último	2022-08-19 14:53:38.8337
36	5	https://www.devmedia.com.br/trabalhando-com-subqueries/40134	Esse é o mais atual	2022-08-19 15:29:17.373296
37	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Só mais essa vez #relembrar	2022-08-19 17:16:05.745304
38	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	A última vai #última	2022-08-19 17:19:11.81697
39	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Olha o GIT #git	2022-08-19 17:21:25.139518
40	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Olha aí #autenticação	2022-08-19 17:23:52.820978
41	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Mais um #git	2022-08-19 17:33:52.363509
42	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Olhaaaa	2022-08-19 17:49:47.967465
43	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Agora vai	2022-08-19 17:54:44.382749
44	5	https://www.alura.com.br/artigos/nova-exigencia-do-git-de-autenticacao-por-token-o-que-e-o-que-devo-fazer	Vamosss	2022-08-19 18:01:11.479633
45	5	https://www.npmjs.com/package/react-infinite-scroller	Please	2022-08-19 18:07:56.893529
46	5	https://www.npmjs.com/package/react-infinite-scroller	VAAAAAI	2022-08-19 18:09:08.140066
47	5	https://stackoverflow.com/questions/65177118/how-to-update-list-of-items-with-infinite-scroll-when-new-item-added	PF	2022-08-19 18:10:39.156112
48	5	https://www.npmjs.com/package/react-infinite-scroller	Vai	2022-08-19 18:15:10.499715
54	5	https://www.npmjs.com/package/use-interval	Mais um teste	2022-08-19 18:26:24.757847
55	5	https://www.npmjs.com/package/use-interval	testee	2022-08-19 18:26:45.973485
56	5	https://www.npmjs.com/package/use-interval	teste 1	2022-08-19 18:27:51.599671
57	5	https://www.npmjs.com/package/use-interval	teste 2	2022-08-19 18:28:02.006014
58	5	https://www.npmjs.com/package/use-interval	teste 3	2022-08-19 18:29:21.409204
59	5	https://www.npmjs.com/package/use-interval	teste 4	2022-08-19 18:29:29.480443
\.


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reposts (id, "postId", "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, username, "pictureURL", "createdAt") FROM stdin;
1	joao@email.com	$2a$10$AIpfkqmXO9lFoPln1jSjrOfaoMn8QA.UvgdYjPfd1NSKTC5wCBJZm	joao	http://www.	2022-08-10 23:17:11.473862
2	jonas@email.com	$2a$10$ZTprnMa6HG19zfn4Pj2h/OGQP5EKwIOnqywAl1C/ZeknIJZGXCloi	jonas	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:23:43.227158
3	jose@email.com	$2a$10$er3xIh1SeOJo7ttvUPiVg..cfkLoR01bGcgvLL6vFCKSU5zCGsSka	jose	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:24:50.117553
4	jose_almeida@email.com	$2a$10$RIzlKtQbfu/PaDl/GiYgXO0JOAdJ1MHbvG3NRgRgHKfHvIFoZRG3e	jose_almeida	https://i.pinimg.com/originals/5c/d6/d9/5cd6d93937b7e01f993b4cb45cba0b03.jpg	2022-08-10 23:36:50.233121
5	maria@email.com	$2a$10$nc2sS7c9WmuyE0QlfFvqvecPaBzoYyuRJO.LBb2qQTlPOGYahiGj.	Maria	data:image/jpeg;base64,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	2022-08-16 09:50:30.085985
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 10, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.followers_id_seq', 3, true);


--
-- Name: hashtagsPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."hashtagsPosts_id_seq"', 48, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 35, true);


--
-- Name: likedPosts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."likedPosts_id_seq"', 266, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 59, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reposts_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


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
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


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
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: followers followers_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public.users(id);


--
-- Name: followers followers_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "followers_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public.users(id);


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
-- Name: reposts reposts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: reposts reposts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

