//DOM
const calc_exp_display = document.querySelector('#calc_xp')
const kf_dif_input = document.querySelector('#kf_diff')
const kf_conc_input = document.querySelector('#kf_conc')
const quest_time_input = document.querySelector('#quest_time')
const calc_exp_button = document.querySelector('#calc_xp_button')
const custom_kf_conc_input = document.querySelector('#custom_kf_conc')
const custom_kf_dif_input = document.querySelector('#custom_kf_dif')
const custom_kf_conc_btn = document.querySelector('#custom_kf_conc_btn')
const custom_kf_dif_btn = document.querySelector('#custom_kf_dif_btn')
//Включение полей со своим вариантом 
custom_kf_conc_btn.addEventListener("change",function(){
    custom_kf_conc_input.disabled = false;
})
custom_kf_dif_btn.addEventListener('change', function () {
	custom_kf_dif_input.disabled = false
})
//Отслеживание кликов на кнопку «Подсчитать опыт» и подсчитывание опыта 
calc_exp_button.addEventListener('click', function () {
    let kfdif = Number(kf_dif_input.elements["choice"].value)
    let kfconc = Number(kf_conc_input.elements['choice'].value);

    if(custom_kf_conc_btn.checked) kfconc = Number(custom_kf_conc_input.value);
    if (custom_kf_dif_btn.checked) kfdif = Number(custom_kf_dif_input.value);
    const time = Number(quest_time_input.value)
	calc_exp_display.textContent = Math.floor(
		kfdif * kfconc * time
	)

	quest_time_input.value = ''
});