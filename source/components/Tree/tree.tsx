import React, { useEffect, useMemo, useState,useReducer } from "react";
import "./styles/tree.scss"
import {Child } from "./child";

export type TreeElement = {
	id: string,
	parentId: any,
	title: string,
	children: TreeElement[],
	expanded: boolean,
	index: number,
	path: string[]
};
type TreeState = {
	root: TreeElement,
	table: { [key: string]: TreeElement }
};

export type TreeActionAdd = {
	type: "add",
	data: {
		parentId: any
	}
};
export type TreeActionRemove = {
	type: "remove",
	data: {
		id: string
		parentId: any
	}
};
export type TreeActionExpand = {
	type: "expand",
	data: {
		id: string,
		expanded: boolean
	}
};

type TreeActionType = TreeActionAdd | TreeActionRemove | TreeActionExpand;

const TreeReducer = ( state: TreeState, action: TreeActionType ) => {

	if( action.type == "add" ){
		let table = { ...state.table };

		let parent = action.data.parentId ? table[ action.data.parentId ] : state.root;

		if( !parent )
			return state;

		let index: number = parent.children.length + 1;

		let leaf: TreeElement  = {
			id: Math.floor( (Math.random() + 1) *  100000.0 ).toString(),
			parentId: parent.id,
			title: "New Leaf",
			index: index,
			path: [ ...parent.path, index.toString() ],
			expanded: false,
			children: []
		};

		parent.expanded = true; // если добавляем в парент детей то разворачиваем парет
		parent.children.push( leaf );
		table[ leaf.id ] = leaf;

		return{
			...state,
			table: table
		}
	};

	if( action.type == "remove" ){
		let table = { ...state.table };
		let parent = action.data.parentId <0 ?  state.root : table[ action.data.parentId ] ;

		if( !parent )
			return state;

		let index = parent.children.findIndex(( item: TreeElement ) => item.id == action.data.id );

		if( index < 0 )
			return state;

		parent.children.splice( index, 1 );
		delete table[ action.data.id ];

		return{
			...state,
			table: table
		}
	};

	if( action.type == "expand" ){
		let table = { ...state.table };
		table[ action.data.id ].expanded = action.data.expanded;

		return{
			...state,
			table: table
		}
	};

	return state;
};

type TreeContextType = {
	dispatch: Function
  };
export const TreeContext = React.createContext<TreeContextType>({
	dispatch: () => {}
});


export const Tree = () => {

	const [ state, dispatch ] = useReducer( TreeReducer, {
		root: { id: "", parentId: "", title: "", children: [], expanded: true, index: 0, path: [] },
		table: {}
	} as TreeState);

	return(
		<section className={"tree"}>
			<div className={"tree-add-wrap"}>
				<p className={"tree-add"} onClick={()=>{
					dispatch({ type: "add", data: { parentId: "" }} as TreeActionAdd)
				 }}>
					<span className={"tree-add-text"}>adding a new list node</span>
					<span className={"tree-add-btn"}>+</span>
				</p>
			</div>

			<div className={"tree-body"}>
				<TreeContext.Provider value={{ dispatch: dispatch }}>
					{
						state.root.children.map(( item: TreeElement, index: number )=>{
							return(
								<Child
									key={ item.id }
									parentId={ "-1" }
									id={ item.id }
									title={ item.title }
									children={ item.children }
									expanded={ item.expanded }
									index={ item.index }
									path={ item.path }
								/>
							)
						})
					}
				</TreeContext.Provider>
			</div>
		</section>
	)
};

