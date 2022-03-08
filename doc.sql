--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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

--
-- Data for Name: doc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doc (id, doc_name, note) FROM stdin;
207	確定申告マニュアル	確定申告に関するマニュアル
208	CSS カウンターの使用方法	CSS カウンターでは、文書内の位置に基づいてコンテンツの表示方法を調整することができます。
225	2022年（令和4年）の確定申告の申告期間と期限	https://biz.moneyforward.com/tax_return/basic/1633/
\.


--
-- PostgreSQL database dump complete
--

