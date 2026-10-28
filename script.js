
//доступы
const input_daily_quest = document.querySelector("#add_daily_quest");
const input_quest = document.querySelector("#add_quest");
const list_daily_quest = document.querySelector("#daily_quests_list");
const list_quest = document.querySelector("#quests_list");
const btn_daily_quest = document.querySelector("#add_daily_quest_btn");
const btn_quest = document.querySelector("#add_quest_btn");
const rank_display = document.querySelector('#rank');
const btn_import = document.querySelector("#btn_import")
const btn_export = document.querySelector('#btn_export')
const import_file = document.querySelector("#import_file");
const exp_quest = document.querySelector("#exp_quest");
const exp_daily_quest = document.querySelector('#exp_daily_quest')

//общий опыт и ранг
let xp = Number(localStorage.getItem("xp")) || 0;
const xp_quantity = document.querySelector("#xp_display");
xp_quantity.textContent = xp;
rank_display.textContent = get_rank(xp);

//*Кнопки добавления квестов* 
//Для ежедневного квеста 
btn_daily_quest.addEventListener("click", function(){
 const text_quest = input_daily_quest.value.trim();
   if (text_quest !== '') {
			const new_quest = document.createElement('li')

			const check_quest = document.createElement('input')
			check_quest.type = 'checkbox'
			let text = document.createElement('span')
			text.textContent = (text_quest + " Награда: " + exp_daily_quest.value + " опыта");

			new_quest.appendChild(text);
			new_quest.appendChild(check_quest);
			const exp_for_quest = Number(exp_daily_quest.value);

			check_quest.addEventListener("change", function(){
				if (check_quest.checked) {
					xp = xp + exp_for_quest
				} else {
					xp = xp - exp_for_quest
				}
				xp_quantity.textContent = xp;
				rank_display.textContent = get_rank(xp)
				localStorage.setItem('xp', xp)
			});

			list_daily_quest.appendChild(new_quest);

			input_daily_quest.value = '';
			exp_daily_quest.value = ''
		}
});

//Для обычного квеста 
btn_quest.addEventListener('click', function () {
	const text_quest = input_quest.value.trim();
	if (text_quest !== '') {
			const new_quest = document.createElement('li');

			const check_quest = document.createElement('input');
			check_quest.type = 'checkbox';
			let text = document.createElement('span');
			text.textContent = (text_quest + ' Награда: ' + exp_quest.value + ' опыта');

			new_quest.appendChild(text);
			new_quest.appendChild(check_quest);
			const exp_for_quest = Number(exp_quest.value);

			check_quest.addEventListener('change', function () {
				if (check_quest.checked) {
					xp = xp + exp_for_quest
				} else {
					xp = xp - exp_for_quest
				}
				xp_quantity.textContent = xp
				rank_display.textContent = get_rank(xp)
				localStorage.setItem('xp', xp)
			});
		
		list_quest.appendChild(new_quest);

		input_quest.value = '';
		exp_quest.value = "";
	}
})

//**Кнопки импорта и экспорта  прогресса** 
//Экспорт
btn_export.addEventListener('click', function () {
	//Создаем объект с данными, которые надо сохранить.
	const data = {
		xp: xp,
	}
	//Преобразуем их в JSON-строку.
	const json = JSON.stringify(data, null, 2)
	//Создаем временный файл, в котором мы сохраним данные.
	const file = new Blob([json], { type: 'application/json' })
	//Создаем временную ссылку на этот файл .
	const url = URL.createObjectURL(file)
	//Создаем ссылку, по которой будем кликать для скачивания этого файла.И кликаем на неё.
	const link = document.createElement('a')
	link.href = url
	link.download = 'progress.json'
	link.click()
	URL.revokeObjectURL(url)
});

//Импорт
btn_import.addEventListener("click", function(){
import_file.click();
import_file.addEventListener("change", function(){
	const file = import_file.files[0];
	if(!file) return;

	const reader = new FileReader();

	reader.onload = function(){
		const data = JSON.parse(reader.result);
		
		xp = Number(data.xp) || 0;
		xp_quantity.textContent = xp;
		rank_display.textContent = get_rank(xp);
		localStorage.setItem("xp",xp);

	}
	reader.readAsText(file);
	import_file.value = "";
});
});


//Обработчик для общих рангов
function get_rank(xp){
	if(xp>=30) return "Продвинутый новичок";
	return "Новичок";
}