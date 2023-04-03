

function cspParser(headers) {
	let str_allHeaders = JSON.stringify(headers);
	str_allHeaders = str_allHeaders.substring(1, str_allHeaders.length - 1);
	const obj = str_allHeaders.split(/,"/);
	var csp_arr = new Array();
	for(var element of obj) {
		let index = element.indexOf(":", 1)
		let header = element.slice(0,index);
		let header_Value = element.slice(index+1, element.length-1)
		while(header.includes("\"")) {
			header = header.replace('"','')
		}
		let arr = [header, [header_Value]]
		csp_arr.push(arr)
	}
	//console.log("OUTPUT")
	//console.log(csp_arr)
	return csp_arr
}



function getHeader(arr, header) {
	for(var h of arr) {
		if(h[0] === header) {
			return h;
		}
	}
}

function cspParser_GetAllHeaders(arr) {
	var header_arr = new Array();
	for(var element of arr) {
		header_arr.push(element[0])
	}
	
	return header_arr;

}

// HIEERERERERE
/*function cspParser_GetAllHeaders(arr, headers) {
	var header_arr = new Array();
	for(var element of arr) {
		header_arr.push(element[0])
	}
	//console.log(header_arr)
	headers.push(header_arr)
	return headers;

}*/

function cspParserGetAllResponseHeaders(finalheaders, allCSP, csp){
	for(let i = 0; i < finalheaders.length; i++){
		for(let j = 0; j < allCSP.length; j++){
			for(let n = 0; n < allCSP[j].length; n++){
				if(finalheaders[i] === allCSP[j][n][0]){
					for(let m = 0; m < csp.length; m++){
						if(csp[m][0] === finalheaders[i]){

						}
					}
				}
				console.log(allCSP[j][n][m])
				console.log(getDirective_Sources())
				
			}
		}
	}
}

function cspParserGetFinalHeaders(headers, finalheaders){
	for(let i = 0; i < headers.length; i++){
		for(let j = 0; j < headers[i].length; j++){
			if(!finalheaders.includes(headers[i][j])){
				finalheaders.push(headers[i][j])
			}
		}
	}
	return finalheaders;
}

function getDirective_Sources(arr, directive) {
	let directive_arr = new Array();
	let output = new Array();
	for(var h of arr) {

		if(h[0] === "content-security-policy") {
            let arr_ = h[1][0].split(";")
            for(var v of arr_) {
                if(v.indexOf(' ') === 0) {
                    v = v.substring(1,v.length)
                }
				//console.log(v)
                directive_arr = v.split(" ");
				
				//console.log(directive_arr[0])
                if(directive_arr[0].includes(directive)) {
					
					
					if(directive_arr.length > 1) {
						directive_arr.shift()
					}else{
						return new Array();
					}
					//console.log("WWWWWWWWWWWWWWWWWW")
					//console.log(directive_arr)
					//console.log("OOOOOOOOOOOOOOO")
					//console.log(directive_arr)
                    for (let i = 0; i < directive_arr.length; i++) {
                        output.push(directive_arr[i])
                    }
					break;
                }
            }
		}else {
			let header_Value = h[1][0]
			let directives_arr = header_Value.split(";");
			for(var d of directives_arr) {
				if (d.includes(directive)) {
					let directive_values = d.split(" ")
					let directive_name = delete_StrSy(directive_values[0])
					output.push(directive_name, directive_values.splice(1,directive_values.length));
					return output;
				}
			}
		}
	}
	//console.log("TTTTTTTTTTTT")
	//console.log(output)
	return output;
}



function getDirectives(csp) {
	var arr = new Array()
	let directives_arr = csp[1][0].split(";");
	//console.log(directives_arr)
	var flage = false;
	if(csp[0] != 'date' && csp[0] != 'expires') {
		for(var d of directives_arr) {
			if(d != '') {
				let directive = d.split(" ")
				let directive_arr = new Array();
				flage = true;
				for(var g of directive) {
					if(g != '') {
						if(csp[0] === 'content-security-policy-report-only' || csp[0] === 'content-security-policy' ) {
							if(flage) {
								g = delete_StrSy(g);
								directive_arr.push(g)
								flage = false;
							}
						} else if (csp[0] === 'report-to') {
							/*let g_2 = new Array();
							if(g.includes("},")) {
								g_2 = g.split(/},/);
							}
							for(var t of g_2) {
								console.log(t)
							}*/
							g = g.split(/\:/)[0];
							g = g.replace(/[^a-zA-Z]_/, '');
							
							directive_arr.push(g)
						}else {
							let dir = delete_StrSy(g);
							if(g.includes("=")) {
								let arr_ex = dir.split("=");
								dir = arr_ex[0]
							}
							directive_arr.push(dir)
						}
					}
				}
				let directive_name = delete_StrSy(directive_arr)
				
				arr.push(directive_name);
			}
		}
	} else {
		let g = delete_StrSy(csp[1][0])
		arr.push(g)
	}
	
	return arr;

}

function delete_StrSy(str) {
	while(str.includes("\"")) {
		str = str.replace('"', '')
	}
	return str;
}

function delete_character(str, s) {
	while(str.includes(`${s}`)) {
		str = str.replace(`${s}`, '')
	}
	return str;
}



function getCSP_Policy(csp, headers, headers_arr) {
	console.log(csp)
	console.log(headers)
	console.log(headers_arr)
	let check_flage = false;
	//let Set-Cookie
		if(csp.length > 0) {
			for(let j = 0; j < headers.length; j++) {
				check_flage = false;
				let index = 0;
				for(let i = 0; i < csp.length; i++) {
					if(headers[j] == csp[i][0]) {
						check_flage = true;
						index = i;
						break;
					}
				}
				if(!check_flage) {
					csp.push(headers_arr[j])
				}else {
					if(!headers_arr[j][0].includes("Set_Cookie") && !headers_arr[j][0].includes("Strict-Transport-Security") ) {

						if(headers_arr[j][0].includes("x-frame-options")){
							console.log("TTTTTTTTTTTTTTTTTTTT")
							console.log(csp[index])
							console.log(headers_arr[j])
							let x_FrameOptions = ""
							console.log("JJJJJJJJJJJJJ")
							console.log(x_FrameOptions)
							for(let u = 0; u < headers_arr[j][1].length; u++){
								if(!csp[index][1].includes(headers_arr[j][1][u])){
									x_FrameOptions += headers_arr[j][1][u].substring(1, headers_arr[j][1][u].length)
								}
							}
							if(x_FrameOptions.length > 0){
								//x_FrameOptions = x_FrameOptions.substring(1, x_FrameOptions.length)
								console.log(csp[index][1][0])
								x_FrameOptions = " " + x_FrameOptions;
								csp[index][1][0] = csp[index][1][0] + x_FrameOptions
							}
							console.log(x_FrameOptions)
							console.log(csp[index])

						}
						let mulcsp = "";
						if(headers_arr[j][0].includes("content-security-policy")){
							//console.log("LOOKKKKK")
							//console.log(csp[index])
							let acsp = getDirectives(csp[index])
							let ncsp = getDirectives(headers_arr[j])
							//console.log("UUUUUUUUUUUUUUUUUUUUU")
							//console.log(acsp)
							//console.log("LLLLLLLLLLLLLLLLLLLL")
							//console.log(ncsp)
							/*
							for(let v of acsp){
								let gh3 = getDirective_Sources(csp, v[0])
								console.log("IIIIIIIIIIIIIIIIIII")
								console.log(gh3)
							}
						
							for(let b of ncsp){
								console.log("MMMMMMMMMMMMMMMMMMMM")
								console.log(b[0])
								let gh4 = getDirective_Sources(headers_arr,b[0])
								console.log(gh4)
							}*/
							let report_uri = false;
							for(let z = 0; z < acsp.length; z++){
								akcspH = acsp[z]
								for(let ncspH of ncsp){
									let array = new Array()
									/*console.log(akcspH)
									console.log(ncspH)
									console.log(akcspH == ncspH)*/
									/*if(akcspH[0] == 'report-uri' && !report_uri){
										if(z == 0){
											mulcsp += akcspH + " "
										}else {
											mulcsp += ";" + akcspH + " "

										}
										report_uri = true
									}*/

									if((akcspH[0] === ncspH[0]) && (akcspH[0] != 'report-uri')){
										//console.log(akcspH)
										//console.log(ncspH)
										let gh3 = getDirective_Sources(csp, akcspH[0])
										//console.log("IIIIIIIIIIIIIIIIIII")
										//console.log(gh3)
										//console.log("MMMMMMMMMMMMMMMMMMMM")
										//console.log(b[0])
										let gh4 = getDirective_Sources(headers_arr,ncspH[0])
										//console.log(gh4)
										if(mulcsp.length != 0){
											mulcsp += ";" + akcspH + " "
										}else {
											mulcsp += akcspH + " "

										}
										//console.log("CHECK CCCCCCCCCCCCCCCCC")
										for(let q = 0; q < gh3.length; q++){
											if(!(!gh4.includes(gh3[q]) && (!gh3[q].includes("nonce")))){
												if(q === gh3.length-1){
													mulcsp += gh3[q]
												}else {
													mulcsp += gh3[q] + " "
												}
											}
										}
								


									}
								}
							}
						

						}
						if(mulcsp.length > 0){
							//console.log("output")
							//console.log(mulcsp)
							csp[index][1] = [mulcsp]
							//console.log(csp[index])
						}
						
						
					}
		
					//console.log(csp[index])
					//console.log(headers_arr[j])
					//console.log(csp[index][1])
					//console.log(headers_arr[j][1])
					//f
				}
			}
		} else {
			for(var u of headers_arr) {
				csp.push(u)
			}
		}
		return csp;
}

module.exports = {
	cspParser,
	getHeader,
	cspParser_GetAllHeaders,
	getDirective_Sources,
	getDirectives,
	delete_StrSy,
	delete_character,
	getCSP_Policy,
	cspParserGetFinalHeaders,
	cspParserGetAllResponseHeaders
}