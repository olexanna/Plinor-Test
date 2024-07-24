import React, { useEffect, useMemo, useState,useReducer } from "react";
import "./styles/content.scss"
import {Tree } from "../../components/Tree/tree";

export const Content = () => {

	return (
		<section className={"content"}>
			<Tree/>
		</section>
	);
};