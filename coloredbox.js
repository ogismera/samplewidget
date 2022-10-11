(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

	class ColoredBox extends HTMLElement {
        
		constructor() {
			var _text;
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

               Arria_Call(){
                
                 var url = "https://app.studio.arria.com:443/alite_content_generation_webapp/text/OAvYPe1y9gA";

                var xhr = new XMLHttpRequest();

                 xhr.open("POST", url,true);

		xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
		xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJFRzk1TmxXZWEzZF9qMWJJVUtKLVZ4WXAiLCJpYXQiOjE2NjM5NDgzMTksImV4cCI6MTgyMTYyODMxOSwiaXNzIjoiQUxpdGUiLCJzdWIiOiI0QWxiZVczUm9jTzkiLCJBTGl0ZS5wZXJtIjpbInByczp4Ok9BdllQZTF5OWdBIl0sIkFMaXRlLnR0IjoidV9hIn0.2tLNExg_aACT8vQjZjcFdRxg0TbQ6Gw12c2jwigGnWjFDC1rJnfArU3Dht0FYcklKFeSWxhZ37k3E138TKVP3g");

		xhr.onreadystatechange = function () {
   			if (xhr.readyState === 4 ) {
      			console.log(xhr.status);
      			console.log(xhr.responseText);
   			}};


		var data = '{"data":[{"id":"Primary","type":"json","jsonData":{"yr2016":{"Revenue":[{"name":"Premium Income","value":"22"},{"name":"Net investment income","value":"6334"},{"name":"Fees and other income","value":"1283"}],"Expenses":[{"name":"Policyholders\' benefits","value":"19046"},{"name":"Change in policyholders\' reserves","value":"7387"},{"name":"Change in group annuity reserves assumed","value":"-1510"},{"name":"General insurance expenses","value":"2251"},{"name":"Commissions","value":"938"},{"name":"State taxes, licenses and fees","value":"237"},{"name":"Dividends to policyholders","value":"1566"},{"name":"Federal income tax (benefit) expense","value":"-326"},{"name":"Net realized capital (losses) gains","value":"-208"}]},"yr2015":{"Revenue":[{"name":"Premium Income","value":"21543"},{"name":"Net investment income","value":"6387"},{"name":"Fees and other income","value":"797"}],"Expenses":[{"name":"Policyholders\' benefits","value":"16300"},{"name":"Change in policyholders\' reserves","value":"8592"}		,{"name":"Change in group annuity reserves assumed","value":"-94200"},{"name":"General insurance expenses","value":"1793"},{"name":"Commissions","value":"869"},{"name":"State taxes, licenses and fees","value":"187"},{"name":"Dividends to policyholders","value":"1728"},{"name":"Federal income tax (benefit) expense","value":"-153"},{"name":"Net realized capital (losses) gains","value":"59"}]}}}],"projectArguments":null,"options":null}';

 		console.log(data);

		xhr.send(data);

               }

               
               setText(newText) {
 			this._text = newText;
			 this.dispatchEvent(new CustomEvent("propertiesChanged", {
 			detail: {
 			properties: {
 			text: this._text
 			}
 			}));
		 }




		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
                        this.Arria_Call();
                        this.setText("Hola");
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
	}

	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();
