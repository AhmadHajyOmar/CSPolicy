
export function cspParser(headers) {
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
	return csp_arr
}



export function getHeader(arr, header) {
	for(var h of arr) {
		if(h[0] === header) {
			return h;
		}
	}
}

export function cspParser_GetAllHeaders(arr) {
	var header_arr = new Array();
	for(var element of arr) {
		header_arr.push(element[0])
	}
	
	return header_arr;

}

export function getDirective_Sources(arr, directive) {
	let directive_arr = new Array();
	let output = new Array();
	for(var h of arr) {
		if(h[1][0].includes(directive)) {
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
}

export function getDirectives(csp) {
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

export function delete_StrSy(str) {
	while(str.includes("\"")) {
		str = str.replace('"', '')
	}
	return str;
}

export function delete_character(str, s) {
	while(str.includes(`${s}`)) {
		str = str.replace(`${s}`, '')
	}
	return str;
}


export function getCSP_Policy(csp, headers, headers_arr) {
	let check_flage = false;
		if(csp.length > 0) {
			for(let j = 0; j < headers.length; j++) {
				check_flage = false;
				for(let i = 0; i < csp.length; i++) {
					if(headers[j] == csp[i][0]) {
						check_flage = true;
					}
				}
				if(!check_flage) {
					csp.push(headers_arr[j])
				} 
			}
		} else {
			for(var u of headers_arr) {
				csp.push(u)
			}
		}
		return csp;
}
