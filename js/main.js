function onSave(){
	const wsXml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(wsXml);
	window.localStorage.setItem('workspaceSave', text);
	console.log(wsXml);
}
function onLoad(){
	const xml_text = window.localStorage.getItem('workspaceSave');
	if(xml_text != null){
        const xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
	//toolboxUpdate();
}
function onInit(){
    Workspace.initialize().commit();
}
function onDownload(){
    //TODO
}
function onRead(){
	const wsDOM = new WorkspaceDOM(Blockly.Xml.workspaceToDom(workspace));
	const roots = wsDOM.getRootBlocks();
	const nodes = [];
	for(let i=0; i < roots.length; i++){
		const blocklyNode = roots[i];
		const node = readNode(blocklyNode);
		
		nodes.push(node);
	}
	console.log(nodes);
	//schviz.visualize(document.querySelector('footer'), scxmlDOM.getXML());
}

function readNode(blocklyElement){
	const name = blocklyElement.getFieldByName("name").getText();
	
	const node = {};
	node.name = name;
	node.transitions = [];
	node.nodes = [];
	node.events = [];
	
	const contentStmt = blocklyElement.getStatementByName("content");
	if(contentStmt != null){
		const content = contentStmt.toBlockList();
		for(let i=0; i < content.length; i++){
			const type = content[i].getType();
			if(type === "transition"){
				const transition = readTransition(content[i]);
				node.transitions.push(transition);
			}else if(type === "node"){
				const innerNode = readNode(content[i]);
				node.nodes.push(innerNode);
			}else if(type === "event"){
				const event = readEvent(content[i]);
				node.events.push(event);
			}else{
				throw "Type error"
			}
		}
	}
	return node;
}
function readTransition(blocklyElement){
	const guard = blocklyElement.getFieldByName("guard").getText();
	const node = blocklyElement.getFieldByName("to").getText();
	
	const transition = {};
	transition.guard = guard;
	transition.node = node;
	
	return transition;
}
function readEvent(blocklyElement){
	const guard = blocklyElement.getFieldByName("event").getText();
	const action = blocklyElement.getFieldByName("do").getText();
	
	const event = {};
	event.guard = guard;
	event.action = action;
	
	return event;
}