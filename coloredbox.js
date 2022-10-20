(function() { 
	var text;
	var obj5;
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
		

		Arria_Call2(obj5){
                 console.log("Trace 5");
		 console.log(obj5);
		var url = "https://app.studio.arria.com:443/alite_content_generation_webapp/text/OKol2ZMrBg9";

		var xhr = new XMLHttpRequest();

		xhr.open("POST", url,true);

		xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
		xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJJV0dDSDQwQkNrMWpacHFrRm9HNElzUG8iLCJpYXQiOjE2NjU5OTgxOTcsImV4cCI6MTgyMzY3ODE5NywiaXNzIjoiQUxpdGUiLCJzdWIiOiJOTXhaQjJRRmd5Y28iLCJBTGl0ZS5wZXJtIjpbInByczp4Ok9Lb2wyWk1yQmc5Il0sIkFMaXRlLnR0IjoidV9hIn0.Wb-T9f90P7ZqAFPDAcIgXcsN1-xQo267VyOpPxl9OwUKTXqiL0r1g4wIbYJYwoF6708yGcjoDHRytLnR7OG_xQ");

		xhr.onreadystatechange = function () {
   		if (xhr.readyState === 4 ) {
     		 	  console.log(xhr.status);
     			 console.log(xhr.responseText);
			debugger;
			 text = xhr.responseText;			
               
  			 }};

		var data = obj5;

		xhr.send(data);
    

               }
               
               setText(text) {
		      
		           var _text = "Hola";
                             this._text = text;
                          debugger;
                          this.dispatchEvent(new CustomEvent("propertiesChanged", {
                          detail: {
                                 properties: {
                          text: this._text
                           }}
                           }));
                                }
                getText(text) {
                           setTimeout(function () {console.log(text);}, 1000);
			       debugger;
			       var _text = text;
                               return this._text;
                           }

                
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
			
			
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			

			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
			
			const dataBinding = this.dataBindings.getDataBinding('myDataBinding');
			var datas = this.myDataBinding.data;
			var arr = [];
			var count = 0;
			this.myDataBinding.data.forEach(row =>{
			  arr[count] =  row;
		          count++;
			} );
			var newArray2 = [];
			const obj3 = [];
			const obj4 = [];
			count = 0;
                        for (let k in arr) {
				newArray2.push({'id': k, 'value': arr[k]});
    				obj3 [count] = JSON.stringify(arr[k]);
				if (count > 0) {
   				   obj4 [count]= '"Row' + count + '": ' + obj3[count];
  					} 
				   else {
			            obj4 [count]= obj3[count];
				   }
				count = count + 1;
				newArray2.shift();
				}
			
			 obj5 = '{"data": [ { "id": "Primary", "type": "json","jsonData":' + obj4 + "}]}";
			this.Arria_Call2(obj5);
			this.setText(text);
			this.getText(text);
			

	}
	}

	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();
