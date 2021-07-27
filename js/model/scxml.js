class abstarctSCXMLObject{
	defaultXML = '';
	xmldom = null;
	initialize(){
		this.xmldom = new DOMParser().parseFromString(this.defaultXML,"text/xml");
	}
	getDOM(){
		return this.xmldom.childNodes[0];
	}
	getXML(){
		return this.getDOM().toString();
	}
}

class scxmlWorkspace extends abstarctSCXMLObject{
	defaultXML = '<scxml xmlns="http://www.w3.org/2005/07/scxml"></scxml>';
	
	addNode(name){
		const node = new scxmlNode();
		node.initialize();
		node.setId(name)
		console.log(node.getDOM())
		return node;
	}
}

class scxmlNode extends abstarctSCXMLObject{
	defaultXML = '<state id="id"></state>'
	
	setId(id){this.getDOM().setAttribute("id",id)}
	getId(){this.getDOM().getAttribute("id")}
	
	addTransition(target,event){
		const transition = new scxmlTransition();
		transition.initialize();
		transition.setTarget(target);
		transition.setEvent(event);
		console.log(transition.getDOM())
		//this.getDOM().appendChild(transition.getDOM());
	}
	
}
class scxmlTransition extends abstarctSCXMLObject{
	defaultXML = '<transition target="target" event="event"></transition>'
	
	setTarget(target)	{this.getDOM().setAttribute("target",target)}
	getTarget()			{this.getDOM().getAttribute("target")}
	setEvent(event)		{this.getDOM().setAttribute("event",event)}
	getEvent()			{this.getDOM().getAttribute("event")}
	
}