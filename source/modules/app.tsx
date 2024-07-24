import React, { useReducer, useState, useEffect, useMemo } from "react";
import "@styles/main.scss"
import "@styles/fonts.scss"
import "@styles/app.scss"
import {Header } from "./Header";
import {Content } from "./Content";
import {Footer } from "./Footer";


export const App = () => {
	return (
		<React.Fragment>
		<Header/>

		<article className={"app"}>
			<Content/>
		</article>

		<Footer/>
		</React.Fragment>
	);
};