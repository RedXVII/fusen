import React, { Component, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'

import interact from 'interactjs'

export default class Interactable extends Component {

	static defaultProps = {
		draggable: false,
		resizable: false,
		draggableOptions: {},
		resizableOptions: {},
		events: null
	}

	render() {
		return cloneElement(this.props.children, {
			ref: node => this.node = node,
			draggable: false
		})
	}

	componentDidMount() {
		this.interact = interact(findDOMNode(this.node));
		this.setInteractions();
		if (this.props.events != null) this.interact.on(this.props.events);
	}

	componentWillReceiveProps() {
		this.interact = interact(findDOMNode(this.node))
		this.setInteractions()
	}

	setInteractions() {
		if (this.props.draggable) this.interact.draggable(this.props.draggableOptions);
		if (this.props.resizable) this.interact.resizable(this.props.resizableOptions);
	}
}

Interactable.propTypes = {
	children: React.PropTypes.node.isRequired,
	draggable: React.PropTypes.bool,
	draggableOptions: React.PropTypes.object,
	resizable: React.PropTypes.bool,
	resizableOptions: React.PropTypes.object,
	events: React.PropTypes.object
}
