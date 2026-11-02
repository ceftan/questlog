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
const list_complete_quest = document.querySelector("#complete_quests_list")
//данные
let xp = 0
let tasks = [] // массив объектов: { text, type, xp, done }
//Константы
const ranks = [
	{ text: 'Бронза 5', xp: 0, tier: 'bronze' },
	{ text: 'Бронза 4', xp: 150, tier: 'bronze' },
	{ text: 'Бронза 3', xp: 350, tier: 'bronze' },
	{ text: 'Бронза 2', xp: 600, tier: 'bronze' },
	{ text: 'Бронза 1', xp: 900, tier: 'bronze' },
	{ text: 'Серебро 5', xp: 1300, tier: 'silver' },
	{ text: 'Серебро 4', xp: 1800, tier: 'silver' },
	{ text: 'Серебро 3', xp: 2400, tier: 'silver' },
	{ text: 'Серебро 2', xp: 3100, tier: 'silver' },
	{ text: 'Серебро 1', xp: 3900, tier: 'silver' },
	{ text: 'Золото 5', xp: 4800, tier: 'gold' },
	{ text: 'Золото 4', xp: 5800, tier: 'gold' },
	{ text: 'Золото 3', xp: 7000, tier: 'gold' },
	{ text: 'Золото 2', xp: 8400, tier: 'gold' },
	{ text: 'Золото 1', xp: 10000, tier: 'gold' },
	{ text: 'Платина 5', xp: 12000, tier: 'platinum' },
	{ text: 'Платина 4', xp: 14500, tier: 'platinum' },
	{ text: 'Платина 3', xp: 17500, tier: 'platinum' },
	{ text: 'Платина 2', xp: 21000, tier: 'platinum' },
	{ text: 'Платина 1', xp: 25000, tier: 'platinum' },
	{ text: 'Алмаз 5', xp: 30000, tier: 'diamond' },
	{ text: 'Алмаз 4', xp: 36000, tier: 'diamond' },
	{ text: 'Алмаз 3', xp: 43000, tier: 'diamond' },
	{ text: 'Алмаз 2', xp: 51000, tier: 'diamond' },
	{ text: 'Алмаз 1', xp: 61000, tier: 'diamond' },
	{ text: 'Легенда 5', xp: 73000, tier: 'legend' },
	{ text: 'Легенда 4', xp: 87000, tier: 'legend' },
	{ text: 'Легенда 3', xp: 10300, tier: 'legend' },
	{ text: 'Легенда 2', xp: 12100, tier: 'legend' },
	{ text: 'Легенда 1', xp: 142000, tier: 'legend' },
	{ text: 'Звёздный лорд', xp: 165000, tier: 'star_lord' }
]
const exp_star = 5000;
// =============================================
// =============================================

// =============================================
// РАЗНЫЕ ОБРАБОТЧИКИ И ФУНКЦИИ
// =============================================
//Обработчик для общих рангов
function get_rank(xp) {
let current = ranks[0];
for(const rank of ranks){
	if(xp>=rank.xp){
		current = rank;
	}
	else break;
}
const max_xp = ranks[ranks.length - 1].xp;
let stars = xp >= max_xp ? Math.floor((xp - max_xp)/exp_star):0;
return {...current,stars}
}
//Функция для обновления опыта и ранга
function update_progress() {
	const get = get_rank(xp);
	xp_display.textContent = xp
	if(xp>=16500) rank_display.textContent = (get.text+" "+get.stars+" звёзд");
	else rank_display.textContent = get.text;
}

//Сохранение в localstorage задач и опыта
function save_data_l() {
	localStorage.setItem('xp', xp)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
//Загрузка из localstorage
function load_data_l() {
	xp = Number(localStorage.getItem('xp')) || 0
	const raw = localStorage.getItem('tasks')
	tasks = raw ? JSON.parse(raw) : []
}
//Функция для отрисовки задач
function render_quest(type) {
	list_daily_quest.innerHTML = ''
	list_quest.innerHTML = ''
	list_complete_quest.innerHTML = ''

	tasks.forEach((task, index) => {
		if (task.type === 'daily') {
			const item = document.createElement('li')
			const checkbox = document.createElement('input')

			checkbox.type = 'checkbox'
			checkbox.value = task.done
			checkbox.checked = JSON.parse(task.done)
			if(JSON.parse(task.done)){
				const label = document.createElement('s')
				label.textContent = task.text + '. Награда: ' + task.xp + ' опыта'
				item.appendChild(label)
			}
			if (JSON.parse(task.done)===false){
				const label = document.createElement('span')
			label.textContent = task.text + '. Награда: ' + task.xp + ' опыта'
			item.appendChild(label)
			}
			item.appendChild(checkbox)
			list_daily_quest.appendChild(item)

			checkbox.addEventListener('change', function () {
				task.done = checkbox.checked
				if (checkbox.checked == true) {
					xp += Number(task.xp)
				} else if (checkbox.checked == false) {
					xp -= Number(task.xp)
				}
				update_progress()
				save_data_l()
			})
		} else if (task.type === 'quest') {
			const item = document.createElement('li')
			const label = document.createElement('span')
			const checkbox = document.createElement('input')

			checkbox.type = 'checkbox'
			label.textContent = task.text + '. Награда: ' + task.xp + ' опыта'
			checkbox.checked = JSON.parse(task.done)

			item.appendChild(label)
			item.appendChild(checkbox)
			if(JSON.parse(task.done)) list_complete_quest.appendChild(item) ;
			if (JSON.parse(task.done)===false) list_quest.appendChild(item);

			checkbox.addEventListener('change', function () {
				task.done = checkbox.checked
				if (checkbox.checked == true) {
					xp += Number(task.xp)
				} else if (checkbox.checked == false) {
					xp -= Number(task.xp)
				}
				update_progress()
				save_data_l()
			})
			

			
		} else return
	})

	update_progress()
	save_data_l()
}

//Функция для вызова отрисовки всех задач
function render_all_quest() {
	render_quest('daily')
	render_quest('quest')
}
rank_display.addEventListener("click",function(){
	render_all_quest();
})
//Функция для добавления задачи
function add_task(text, type, xp) {
	tasks.push({
		text: text,
		type: type,
		xp: xp,
		done: false,
	})
	save_data_l()
	render_all_quest
}
// =============================================
// =============================================

// =============================================
//КНОПКИ ДЛЯ ДОБАВЛЕНИЯ КВЕСТОВ
// =============================================
//Для ежедневного квеста
btn_daily_quest.addEventListener('click', function () {
	const text_quest = input_daily_quest.value.trim()
	const exp = Number(exp_daily_quest.value)
	if (!text_quest) return
	if (!exp) return
	if (exp < 0) {
		exp_daily_quest.value = ''
		return
	}
	add_task(text_quest, 'daily', exp)
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
	if (!text_quest) return
	if (!exp) return
	if (exp < 0) {
		exp_quest.value = ''
		return
	}
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
		task: tasks,
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
		tasks = Array.isArray(data.task) ? data.task : []

		render_all_quest()
		update_progress()
		save_data_l()
	}
	reader.readAsText(file)
	import_file.value = ''
})
// =============================================
// =============================================

// =============================================
//СТАРТ
// =============================================
load_data_l()
update_progress()
render_all_quest()
