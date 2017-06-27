import $ from 'jquery'; //bring in jquery


export function Update_Counter( number, counter ) {
   $(`.${counter} .counter_total`).html(number.toLocaleString());//chage the html to the new number
}

export function Update_Name( name, counter ) {
   $(`.${counter} .counter_biggest`).html( `@${ name }` );//chage the html to the new number
}