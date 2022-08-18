const convertedContainer = document.getElementById("converted-container");
const convertedHeader = document.getElementById("converted-header");
const textInput = document.getElementById("text-input");
const toggle = document.getElementById("theme-toggle");

const storedTheme =
	localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

function switchMode() {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	let targetTheme = "light";
	if (currentTheme === "light") {
		targetTheme = "dark";
	}
	document.documentElement.setAttribute("data-theme", targetTheme);
	localStorage.setItem("theme", targetTheme);
}

let text;

function processText() {
	text = text.trim();
	eyeonicReading(text);
	const eyeonicText = `<p class="text">${eyeonicReading(text)}</p>`;
	convertedContainer.innerHTML = eyeonicText.replace(/\n/g, `<br>`);
	if (textInput.value.length === 0) {
		convertedHeader.style.color = "var(--converted-color-1)";
	} else {
		convertedHeader.style.color = "var(--converted-color-2)";
	}
}

function getRandomParagraph(array) {
	const randomIndex = Math.floor(Math.random() * array.length);
	const item = array[randomIndex];
	return item;
}

textInput.addEventListener("keyup", function (event) {
	text = event.target.value;
	processText();
});

function generateParagraph() {
	textInput.value = getRandomParagraph(paragraphs);
	text = textInput.value;
	processText();
}

function eyeonicReading(text) {
	const wordArray = text.split(/( |\n)/);
	const letterArray = wordArray.map((element) => element.split(""));
	const array1 = letterArray.map((element) => {
		const length = element.length;
		const boldLength = Math.floor((length / 100) * 40);
		let boldLetters = [];
		let plainLetters = [];
		for (let i = 0; i < element.length; i++) {
			if (i <= boldLength) {
				boldLetters.push(element[i]);
			} else {
				plainLetters.push(element[i]);
			}
		}

		const formattedWord = [];
		formattedWord.push(`<span class="bold-letters">${boldLetters.join("")}</span>`);
		formattedWord.push(`${plainLetters.join("")}`);
		return formattedWord;
	});

	const array2 = array1.map((element) => element.join("")).join(" ");
	return array2;
}

function clearText() {
	textInput.value = "";
	convertedContainer.innerHTML = "";
	convertedHeader.style.color = "var(--converted-color-1)";
}

function clearStyle() {
	$("#converted-container").css("boxShadow", "none");
	$("#converted-container").css("border", "none");
	$("span.bold-letters").css("color", "#161616");
	$("#converted-container").css("color", "#161616");
	$("#converted-container").css("backgroundColor", "#fff");
	$("#converted-container").css("maxHeight", "none");
}

function returnStyle() {
	$("#converted-container").css("boxShadow", "var(--box-shadow-setting)");
	$("#converted-container").css("border", "var(--border-setting)");
	$("span.bold-letters").css("color", "var(--text-color)");
	$("#converted-container").css("color", "var(--text-color)");
	$("#converted-container").css("backgroundColor", "var(--textarea-color)");
	$("#converted-container").css("maxHeight", "var(--height-2)");
	$("#converted-container").css("minHeight", "var(--height-1)");
}

function CreatePDFfromHTML() {
	if (textInput.value.length === 0) {
		alert("Please enter or generate text to create PDF.");
	} else {
		clearStyle();
		var HTML_Width = $("#converted-container").width();
		var HTML_Height = $("#converted-container").height();
		var top_left_margin = 15;
		var PDF_Width = HTML_Width + top_left_margin * 2;
		var PDF_Height = PDF_Width * 1.1 + top_left_margin * 2;
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

		html2canvas($("#converted-container")[0], { scale: 5 }).then(function (canvas) {
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
			pdf.addImage(imgData, "JPG", top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
			for (var i = 1; i <= totalPDFPages; i++) {
				pdf.addPage(PDF_Width, PDF_Height);
				pdf.addImage(
					imgData,
					"JPG",
					top_left_margin,
					-(PDF_Height * i) + top_left_margin * 4,
					canvas_image_width,
					canvas_image_height
				);
			}

			pdf.save("eye_onic_text.pdf");
			returnStyle();
		});
	}
}

function swRegistration() {
	const heart = ["font-size: 20px", "padding: 12px", "margin: 4px 0 4px 4px", "color: rgba(238,58,136,1)"].join(";");
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("/sw.js")
			.then(function (registration) {
				console.log("%c❤️", heart);
			})
			.catch(function (err) {
				console.log(err);
			});
	}
}

function consoleText() {
	console.clear();
	const styles = [
		"color: white",
		"background: rgba(238,58,136,1)",
		"font-size: 18px",
		"padding: 12px",
		"margin: 6px 0 6px 14px",
	].join(";");
	const styles2 = ["font-size: 14px", "padding: 16px", "margin: 6px 0 6px 0", "color: rgba(238,58,136,1)"].join(";");
	console.log("%cHello World! I'm Emmanuel.", styles);
	console.log("%cThank you for checking out my work!", styles2);
	const gradient = [
		"font-size: 14px",
		"color: #fff",
		"width: 200px",
		"padding: 8px",
		"margin: 6px 0 6px 14px",
		"border-radius: 4px",
		"background: rgba(238,58,136,1)",
		"background: linear-gradient( 109.6deg, rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% )",
	].join(";");
	console.log("%cPortfolio%chttps://bit.ly/3QQr1Ux", gradient, styles2);
	console.log("%cLinkedin %chttps://bit.ly/3cygAD4", gradient, styles2);
	console.log("%cGithub   %chttps://bit.ly/3iwQC6U", gradient, styles2);
	console.log("%cThe README   %chttps://bit.ly/3PtSgmA", gradient, styles2);
	console.log("%cHave a wonderful day!", styles2);
}

swRegistration();
consoleText();

const paragraphs = [
	"Moby Dick\nby Herman Melville\n\nCall me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation.\n\nWhenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.\n\nThis is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",

	"The Hitchhiker's Guide to the Galaxy\nby Douglas Adams\n\nThis planet has — or rather had — a problem, which was this: most of the people living on it were unhappy for pretty much all of the time. Many solutions were suggested for this problem, but most of these were largely concerned with the movement of small green pieces of paper, which was odd because on the whole it wasn't the small green pieces of paper that were unhappy.",

	"The Road Not Taken\nby Robert Frost\n\nTwo roads diverged in a yellow wood,\n And sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;\n\nThen took the other, as just as fair,\n And having perhaps the better claim,\nBecause it was grassy and wanted wear;\nThough as for that the passing there\nHad worn them really about the same,\n\nAnd both that morning equally lay\nIn leaves no step had trodden black.\nOh, I kept the first for another day!\nYet knowing how way leads on to way,\nI doubted if I should ever come back.\n\nI shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",

	"The Cerulean Sweater Monologue\nfrom The Devil Wears Prada\n\nThis… “stuff”? Oh, okay. I see, you think this has nothing to do with you.\n\nYou… go to your closet, and you select… I don’t know, that lumpy blue sweater for instance, because you’re trying to tell the world that you take yourself too seriously to care about what you put on your back, but what you don’t know is that that sweater is not just blue, it’s not turquoise, it’s not lapis, it’s actually cerulean.\n\nYou’re also blithely unaware of the fact that, in 2002, Oscar de la Renta did a collection of cerulean gowns, and then I think it was Yves Saint Laurent, wasn’t it?… who showed cerulean military jackets. I think we need a jacket here.\n\nAnd then cerulean quickly showed up in the collections of eight different designers. Then it filtered down through the department stores, and then trickled on down into some tragic casual corner where you, no doubt, fished it out of some clearance bin.\n\nHowever, that blue represents millions of dollars of countless jobs, and it’s sort of comical how you think that you’ve made a choice that exempts you from the fashion industry, when in fact, you’re wearing a sweater that was selected for you by the people in this room… from a pile of “stuff.”",

	"Jabberwocky\nby Lewis Carroll\n\n’Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.\n\n“Beware the Jabberwock, my son!\nThe jaws that bite, the claws that catch!\nBeware the Jubjub bird, and shun\nThe frumious Bandersnatch!”\n\nHe took his vorpal sword in hand;\nLong time the manxome foe he sought—\nSo rested he by the Tumtum tree\nAnd stood awhile in thought.\n\nAnd, as in uffish thought he stood,\nThe Jabberwock, with eyes of flame,\nCame whiffling through the tulgey wood,\nAnd burbled as it came!\n\nOne, two! One, two! And through and through\nThe vorpal blade went snicker-snack!\n He left it dead, and with its head\nHe went galumphing back.\n\n“And hast thou slain the Jabberwock?\nCome to my arms, my beamish boy!\nO frabjous day! Callooh! Callay!”\nHe chortled in his joy.\n\n’Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.",

	"The Night the Lights Went Out in Georgia Monologue\nfrom Designing Women\n\nJulia: I'm Julia Sugarbaker, Suzanne Sugarbaker's sister. I couldn't help over hearing part of your conversation.\n\nMarjorie: Well, I'm sorry. I didn't know anyone was here.\n\nJulia: Yes, and I gather from your comments there are a couple of other things you don't know, Marjorie. For example, you probably didn't know that Suzanne was the only contestant in Georgia pageant history to sweep every category except congeniality, and that is not something the women in my family aspire to anyway.\n\nOr that when she walked down the runway in her swimsuit, five contestants quit on the spot. Or that when she emerged from the isolation booth to answer the question, 'What would you do to prevent war?' she spoke so eloquently of patriotism, battlefields and diamond tiaras, grown men wept.\n\nAnd you probably didn't know, Marjorie, that Suzanne was not just any Miss Georgia, she was THE Miss Georgia. She didn't twirl just a baton, that baton was on fire. And when she threw that baton into the air, it flew higher, further, faster than any baton has ever flown before, hitting a transformer and showering the darkened arena with sparks!\n\nAnd when it finally did come down, Marjorie, my sister caught that baton, and 12,000 people jumped to their feet for sixteen and one-half minutes of uninterrupted thunderous ovation, as flames illuminated her tear-stained face! And that, Marjorie — just so you will know — and your children will someday know ---is the night the lights went out in Georgia!",

	"Charlotte's Web\nby E. B. White\n\n‘Why did you do all this for me?’ he asked. ‘I don’t deserve it. I’ve never done anything for you.’ ‘You have been my friend,’ replied Charlotte. ‘That in itself is a tremendous thing.’",

	"The Return of the King\nby J. R. R. Tolkien\n\nThere, peeping among the cloud-wrack above a dark tor high up in the mountains, Sam saw a white star twinkle for a while. The beauty of it smote his heart, as he looked up out of the forsaken land, and hope returned to him. For like a shaft, clear and cold, the thought pierced him that in the end the Shadow was only a small and passing thing: there was a light and high beauty for ever beyond its reach.",

	"To Kill a Mockingbird\nby Harper Lee\n\nI wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand. It’s when you know you’re licked before you begin but you begin anyway and you see it through no matter what.",

	"Erin's Monologue\nfrom Midnight Mass\n\nThe cosmos and its infinite dreams. We are the cosmos dreaming of itself. It’s simply a dream that I think is my life, every time. But I’ll forget this. I always do. I always forget my dreams.\n\nBut now, in this split-second, in the moment I remember, the instant I remember, I comprehend everything at once.\n\nThere is no time. There is no death. Life is a dream. It’s a wish. Made again and again and again and again and again and again and on into eternity. And I am all of it.\n\nI am everything. I am all. I am that I am.",
];
