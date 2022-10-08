const translate = document.getElementById("translate");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const textToTranslate = document.getElementById("textToTranslate");
const translatedText = document.getElementById("translatedText");
const loading = document.getElementById("loading");

const cog_key = "0a8a2afae0cc4e29b3fad0ac3b022dd8";
const cog_location = "eastus2";

async function queryAPI(url = "", data = {}) {
	const response = await fetch(url, {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": cog_key,
			"Ocp-Apim-Subscription-Region": cog_location,
			"X-ClientTraceId": "30c34a1b-9963-4afe-9359-7556c210cb3b", // str(uuid.uuid4())
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		// redirect: "follow", // manual, *follow, error
		// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json();
}

translate.onclick = translateLang;

function translateLang() {
	const from = fromLang.value;
	const to = toLang.value;
	if (from == "" || from === "From") {
		alert("Pick a language you want to translate from");
		return;
	}
	if (to == "" || to === "To") {
		alert("Pick a language you want to translate to");
		return;
	}
	if (textToTranslate.value == "") {
		alert("Input a text to translate");
	}
	const baseURL =
		"https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&";
	const params = `from=${from}&to=${to}`;
	const url = baseURL + params;
	console.log(from, to, url);
	loading.classList.add("fa");
	loading.classList.add("fa-spinner");
	loading.classList.add("fa-spin");
	queryAPI(url, [
		{
			text: textToTranslate.value,
		},
	])
		.then((data) => {
			loading.classList.remove("fa");
			loading.classList.remove("fa-spinner");
			loading.classList.remove("fa-spin");
			console.log(data[0].translations[0].text);
			const text = data[0].translations[0].text;
			translatedText.textContent = text;
			console.log(data); // JSON data parsed by `data.json()` call
		})
		.catch((err) => {
			loading.classList.remove("fa");
			loading.classList.remove("fa-spinner");
			loading.classList.remove("fa-spin");
			console.log(err);
			alert(err);
		});
}

// /knowledgebases/c619f6f5-90f7-4e72-973e-d09416ca17ba/generateAnswer
