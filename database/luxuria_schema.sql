--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-11-16 21:38:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 234 (class 1259 OID 73828)
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_logs (
    id integer NOT NULL,
    action text,
    performed_by integer,
    target_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.audit_logs OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 73827)
-- Name: audit_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audit_logs_id_seq OWNER TO postgres;

--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 233
-- Name: audit_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_logs_id_seq OWNED BY public.audit_logs.id;


--
-- TOC entry 220 (class 1259 OID 49219)
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    title text,
    price numeric,
    category text,
    store text,
    sold integer DEFAULT 0,
    thumbnail text
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49218)
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 219
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- TOC entry 224 (class 1259 OID 57370)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    selected_image character varying(255),
    quantity integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 57369)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 223
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 228 (class 1259 OID 73779)
-- Name: digital_marketers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.digital_marketers (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    platform text,
    note text,
    referral_code text NOT NULL,
    approved boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.digital_marketers OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 73778)
-- Name: digital_marketers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.digital_marketers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.digital_marketers_id_seq OWNER TO postgres;

--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 227
-- Name: digital_marketers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.digital_marketers_id_seq OWNED BY public.digital_marketers.id;


--
-- TOC entry 230 (class 1259 OID 73794)
-- Name: dm_clicks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dm_clicks (
    id integer NOT NULL,
    marketer_id integer,
    url text,
    clicked_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dm_clicks OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 73793)
-- Name: dm_clicks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dm_clicks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dm_clicks_id_seq OWNER TO postgres;

--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 229
-- Name: dm_clicks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dm_clicks_id_seq OWNED BY public.dm_clicks.id;


--
-- TOC entry 232 (class 1259 OID 73809)
-- Name: dm_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dm_orders (
    id integer NOT NULL,
    marketer_id integer,
    order_id integer,
    commission numeric(10,2),
    verified boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.dm_orders OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 73808)
-- Name: dm_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dm_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dm_orders_id_seq OWNER TO postgres;

--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 231
-- Name: dm_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dm_orders_id_seq OWNED BY public.dm_orders.id;


--
-- TOC entry 226 (class 1259 OID 73760)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT orders_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 73759)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 218 (class 1259 OID 49209)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title text,
    price numeric,
    category text,
    store text,
    sold integer DEFAULT 0,
    thumbnail text,
    subimages text[]
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 49208)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 222 (class 1259 OID 57358)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 57357)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4700 (class 2604 OID 73831)
-- Name: audit_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs ALTER COLUMN id SET DEFAULT nextval('public.audit_logs_id_seq'::regclass);


--
-- TOC entry 4683 (class 2604 OID 49222)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- TOC entry 4687 (class 2604 OID 57373)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4692 (class 2604 OID 73782)
-- Name: digital_marketers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.digital_marketers ALTER COLUMN id SET DEFAULT nextval('public.digital_marketers_id_seq'::regclass);


--
-- TOC entry 4695 (class 2604 OID 73797)
-- Name: dm_clicks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_clicks ALTER COLUMN id SET DEFAULT nextval('public.dm_clicks_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 73812)
-- Name: dm_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_orders ALTER COLUMN id SET DEFAULT nextval('public.dm_orders_id_seq'::regclass);


--
-- TOC entry 4690 (class 2604 OID 73763)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4681 (class 2604 OID 49212)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4685 (class 2604 OID 57361)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4897 (class 0 OID 73828)
-- Dependencies: 234
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_logs (id, action, performed_by, target_id, created_at) FROM stdin;
\.


--
-- TOC entry 4883 (class 0 OID 49219)
-- Dependencies: 220
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, title, price, category, store, sold, thumbnail) FROM stdin;
\.


--
-- TOC entry 4887 (class 0 OID 57370)
-- Dependencies: 224
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, user_id, product_id, selected_image, quantity, created_at) FROM stdin;
1	\N	1	/uploads/1762441093068.JPG	1	2025-11-11 16:57:10.542651
\.


--
-- TOC entry 4891 (class 0 OID 73779)
-- Dependencies: 228
-- Data for Name: digital_marketers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.digital_marketers (id, name, email, phone, platform, note, referral_code, approved, created_at) FROM stdin;
1	atouba Dlibna	linapowers237@gmail.com	67652324242	whatsapp	goood	052EDPBF	f	2025-11-15 08:44:19.652215
2						OHGPFTOB	f	2025-11-15 08:52:05.9636
3	dalina mengue	fpeleke@yahoo.com	673249374	Tiktok	very vibrant	63C3IPQZ	f	2025-11-15 12:25:37.691667
\.


--
-- TOC entry 4893 (class 0 OID 73794)
-- Dependencies: 230
-- Data for Name: dm_clicks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dm_clicks (id, marketer_id, url, clicked_at) FROM stdin;
\.


--
-- TOC entry 4895 (class 0 OID 73809)
-- Dependencies: 232
-- Data for Name: dm_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dm_orders (id, marketer_id, order_id, commission, verified, created_at) FROM stdin;
\.


--
-- TOC entry 4889 (class 0 OID 73760)
-- Dependencies: 226
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, product_id, quantity, created_at) FROM stdin;
3	1	1	4	2025-11-15 04:05:57.816173
\.


--
-- TOC entry 4881 (class 0 OID 49209)
-- Dependencies: 218
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, title, price, category, store, sold, thumbnail, subimages) FROM stdin;
1	product	2000	Men	produuccttttt	0	/uploads/1762441093068.JPG	{/uploads/1762441093069.jpeg,/uploads/1762441093075.jpeg,/uploads/1762441093080.jpeg,/uploads/1762441093084.jpeg}
2	sensor stick	20000	Electronics	verrrrryy goood	0	/uploads/1762879334530.jpeg	{/uploads/1762879334533.jpeg,/uploads/1762879334534.JPG,/uploads/1762879334540.jpeg,/uploads/1762879334545.JPG}
3	yeayehh	2000	Toys	dvkhkzxfvjk	0	/uploads/1762879728180.jpeg	{/uploads/1762879728183.jpg,/uploads/1762879728187.jpeg,/uploads/1762879728189.jpeg,/uploads/1762879728193.jpeg}
\.


--
-- TOC entry 4885 (class 0 OID 57358)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, created_at) FROM stdin;
1	linapowers237@gmail.com	$2b$10$kOoozXqBg9guGYL8sCllzumA4EiC/5lVYxCoJhZR7tX0bor9WsiIK	\N	2025-11-11 16:49:57.810732
\.


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 233
-- Name: audit_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_logs_id_seq', 1, false);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 219
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_id_seq', 1, false);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 223
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 23, true);


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 227
-- Name: digital_marketers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.digital_marketers_id_seq', 3, true);


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 229
-- Name: dm_clicks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_clicks_id_seq', 1, false);


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 231
-- Name: dm_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_orders_id_seq', 1, false);


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 225
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 3, true);


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 217
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 4728 (class 2606 OID 73836)
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 57377)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 49227)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4718 (class 2606 OID 73790)
-- Name: digital_marketers digital_marketers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.digital_marketers
    ADD CONSTRAINT digital_marketers_email_key UNIQUE (email);


--
-- TOC entry 4720 (class 2606 OID 73788)
-- Name: digital_marketers digital_marketers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.digital_marketers
    ADD CONSTRAINT digital_marketers_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 73792)
-- Name: digital_marketers digital_marketers_referral_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.digital_marketers
    ADD CONSTRAINT digital_marketers_referral_code_key UNIQUE (referral_code);


--
-- TOC entry 4724 (class 2606 OID 73802)
-- Name: dm_clicks dm_clicks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_clicks
    ADD CONSTRAINT dm_clicks_pkey PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 73816)
-- Name: dm_orders dm_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_orders
    ADD CONSTRAINT dm_orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 73767)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4704 (class 2606 OID 49217)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 65550)
-- Name: cart_items unique_user_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT unique_user_product UNIQUE (user_id, product_id);


--
-- TOC entry 4708 (class 2606 OID 57368)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4710 (class 2606 OID 57366)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 57378)
-- Name: cart_items cart_items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4732 (class 2606 OID 73803)
-- Name: dm_clicks dm_clicks_marketer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_clicks
    ADD CONSTRAINT dm_clicks_marketer_id_fkey FOREIGN KEY (marketer_id) REFERENCES public.digital_marketers(id) ON DELETE CASCADE;


--
-- TOC entry 4733 (class 2606 OID 73817)
-- Name: dm_orders dm_orders_marketer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_orders
    ADD CONSTRAINT dm_orders_marketer_id_fkey FOREIGN KEY (marketer_id) REFERENCES public.digital_marketers(id) ON DELETE CASCADE;


--
-- TOC entry 4734 (class 2606 OID 73822)
-- Name: dm_orders dm_orders_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_orders
    ADD CONSTRAINT dm_orders_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- TOC entry 4730 (class 2606 OID 73773)
-- Name: orders orders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4731 (class 2606 OID 73768)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-11-16 21:38:24

--
-- PostgreSQL database dump complete
--

