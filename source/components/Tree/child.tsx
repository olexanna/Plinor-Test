import React, { useEffect, useMemo, useState, useReducer, useRef, useContext } from "react";
import "@components/Tree/styles/tree.scss"
import { TreeActionAdd, TreeActionExpand, TreeActionRemove, TreeContext, TreeElement } from "./tree";

const TreePathToTitle = ( title: string, path: string[] ) => {
	let result = path.join( "." );
	return title + " " + result;
};

export const Child = ( props: TreeElement ) => {

	let { id, parentId, expanded } = props;
	let { dispatch } = useContext(TreeContext);
	let mark = expanded ? " flex" : " hidden";

	return(
		<div className={"tree-child"}>

			<div className={"tree-child-wrap " }>
				<p className={"tree-child-expand " + (!expanded ? "" : "expand-arrow") } onClick={() => { 
					dispatch({ type: "expand", data: { id: id, expanded: !expanded }} as TreeActionExpand) 
				}}>&#8595;</p>

				<div className={"tree-child-text"}>{ TreePathToTitle( props.title, props.path ) }</div>

				<p className={"child-btn"}>
					<span className={"child-btn-add"} onClick={() => { 
						dispatch({ type: "add", data: { parentId: id }} as TreeActionAdd)
					 }}>{"+"}</span>
					<span className={"child-btn-remove"} onClick={() => { 
						dispatch({ type: "remove", data: { id: id, parentId: parentId }} as TreeActionRemove)
					}}>{"-"}</span>
				</p>
			</div>

			<div className={ "tree-children " + ( mark ) }>
				{
					props.children.map(( unit : TreeElement, index: number )=>{
						return(
							<Child
								key={ unit.id }
								parentId={ id }
								id={ unit.id }
								title={ unit.title }
								children={ unit.children }
								expanded={ unit.expanded }
								index={ unit.index }
								path={ unit.path }
							/>
						);
					})
				}
			</div>
		</div>
	)
};