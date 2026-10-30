// =============================================
//ДАННЫЕ И DOM
// =============================================
//DOM
const input_daily_quest = document.querySelector('#add_daily_quest')
const input_quest = document.querySelector('#add_quest')
const list_daily_quest = document.querySelector('#daily_quests_list')
const list_quest = document.querySelector('#quests_list')
const btn_daily_quest = document.querySelector('#add_daily_quest_btn')
const btn_quest = document.querySelector('#add_quest_btn')
const rank_display = document.querySelector('#rank')
const btn_import = document.querySelector('#btn_import')
const btn_export = document.querySelector('#btn_export')
const import_file = document.querySelector('#import_file')
const exp_quest = document.querySelector('#exp_quest')
const exp_daily_quest = document.querySelector('#exp_daily_quest')
const xp_display = document.querySelector('#xp_display')
//данные
let xp = 0
let tasks = [] // массив объектов: { text, type, xp, done }
// =============================================
// =============================================

// =============================================
// РАЗНЫЕ ОБРАБОТЧИКИ И ФУНКЦИИ
// =============================================
//Обработчик для общих рангов
function get_rank(xp) {
if (xp >= 27000) return {name:"Легенда ",place:"1",type:"legend"}
if (xp >= 22000) return {name:"Легенда ",place:"2",type:"legend"}
if (xp >= 18000) return {name:"Легенда ",place:"3",type:"legend"}

if (xp >= 14500) return {name:"Алмаз ",place:"1",type:"diamond"}
if (xp >= 11500) return {name:"Алмаз ",place:"2",type:"diamond"}
if (xp >= 9000) return {name:"Алмаз ",place:"3",type:"diamond"}

if (xp >= 7000) return {name:"Платина ",place:"1",type:"platinum"}
if (xp >= 5500) return {name:"Платина ",place:"2",type:"platinum"}
if (xp >= 4300) return {name:"Платина ",place:"3",type:"platinum"}

if (xp >= 3300) return {name:"Золото ",place:"1",type:"gold"}
if (xp >= 2500) return {name:"Золото ",place:"2",type:"gold"}
if (xp >= 1800) return {name:"Золото ",place:"3",type:"gold"}

if (xp >= 1200) return {name:"Серебро ",place:"1",type:"silver"}
if (xp >= 800) return {name:"Серебро ",place:"2",type:"silver"}
if (xp >= 500) return {name:"Серебро ",place:"3",type:"silver"}

if (xp >= 250) return {name:"Бронза ",place:"1",type:"bronze"}
	if (xp >= 100) return {name:"Бронза ",place:"2",type:"bronze"}
	if (xp < 100) return {name:"Бронза ",place:"3",type:"bronze"}
}
//Функция для обновления опыта и ранга
function update_progress() {
	xp_display.textContent = xp
	rank_display.textContent = (get_rank(xp).name + " " +  get_rank(xp).place);
		}

//Сохранение в localstorage задач и опыта 
function save_data_l() {
	localStorage.setItem("xp",xp);
	localStorage.setItem("tasks",JSON.stringify(tasks));
}
//Загрузка из localstorage
function load_data_l (){
	xp = Number(localStorage.getItem('xp')) || 0;
	const raw = localStorage.getItem("tasks");
	tasks = raw ? JSON.parse(raw) : [];
}
//Функция для отрисовки задач
function render_quest(type){
	list_daily_quest.innerHTML = ''
	list_quest.innerHTML = ''
	
	tasks.forEach((task, index) => {
		
		if(task.type === "daily"){
		
		const item = document.createElement('li')
		const label = document.createElement('span')
		const checkbox = document.createElement('input')

		checkbox.type = 'checkbox'
		label.textContent = (task.text + ". Награда: "+task.xp+" опыта")
		checkbox.value = task.done
		checkbox.checked = JSON.parse(task.done)

		item.appendChild(label)
		item.appendChild(checkbox)
		list_daily_quest.appendChild(item)
		
		
		checkbox.addEventListener('change', function () {
			task.done = checkbox.checked;
			if (checkbox.checked == true) {
				xp += Number(task.xp)
			} else if (checkbox.checked == false) {
				xp -= Number(task.xp)
			}
			update_progress()
			save_data_l()
		})
	}
	else if (task.type === 'quest') {
		
		const item = document.createElement('li')
		const label = document.createElement('span')
		const checkbox = document.createElement('input')

		checkbox.type = 'checkbox'
		label.textContent = (task.text + '. Награда: ' + task.xp + ' опыта')
		checkbox.checked = JSON.parse(task.done);

		item.appendChild(label)
		item.appendChild(checkbox)
		list_quest.appendChild(item)

		checkbox.addEventListener('change', function () {
			task.done = checkbox.checked;
			if (checkbox.checked == true) {
				xp += Number(task.xp)
			} else if (checkbox.checked == false) {
				xp -= Number(task.xp)
			}
			update_progress()
			save_data_l()
		})
	}
		else return;
	})


	update_progress();
	save_data_l();
}


//Функция для вызова отрисовки всех задач
function render_all_quest(){
	render_quest("daily")
	render_quest("quest")
}
//Функция для добавления задачи 
function add_task(text,type,xp){
	tasks.push({
		text: text,
		type: type,
		xp: xp,
		done:false
	})
	save_data_l();
	render_all_quest;
}
// =============================================
// =============================================

// =============================================
//КНОПКИ ДЛЯ ДОБАВЛЕНИЯ КВЕСТОВ
// =============================================
//Для ежедневного квеста
btn_daily_quest.addEventListener('click', function () {
	const text_quest = input_daily_quest.value.trim()
	const exp = Number(exp_daily_quest.value);
	if (!text_quest) return;
	else if (!exp) return;
	add_task(text_quest,"daily",exp);
	input_daily_quest.value = ''
	exp_daily_quest.value = ''
	render_all_quest()
	update_progress()
	save_data_l()
})

//Для обычного квеста
btn_quest.addEventListener('click', function () {
	const text_quest = input_quest.value.trim()
	const exp = Number(exp_quest.value)
	if (!text_quest) return;
	else if (!exp) return;
	add_task(text_quest, 'quest', exp)
	input_quest.value = ''
	exp_quest.value = ''
	render_all_quest()
	update_progress()
	save_data_l()
})
// =============================================
// =============================================

// =============================================
//КНОПКИ ИМПОРТА И ЭКСПОРТА ПРОГРЕССА
// =============================================
//Экспорт
btn_export.addEventListener('click', function () {
	//Создаем объект с данными, которые надо сохранить.
	const data = {
		xp: xp,
		task: tasks
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
})

//Импорт
btn_import.addEventListener('click', function () {
	import_file.click()
})
	import_file.addEventListener('change', function () {
		const file = import_file.files[0]
		if (!file) return

		const reader = new FileReader()

		reader.onload = function () {
			const data = JSON.parse(reader.result)

			xp = Number(data.xp) || 0
			tasks = Array.isArray(data.task) ? data.task : [];		
			
			render_all_quest();
			update_progress();
			save_data_l();
		}
		reader.readAsText(file)
		import_file.value = ''
	})
// =============================================
// =============================================

// =============================================
//СТАРТ
// =============================================
load_data_l();
update_progress();
render_all_quest();
