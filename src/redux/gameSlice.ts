import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {WordProps} from "../App";
import {fetchPhrases, fetchWords} from './counterAPI';
import {RootState} from "./store";

export interface CounterState {
    status: 'idle' | 'loading' | 'failed';
    words: WordProps[],
    phrases: WordProps[]
}


const words: WordProps[] = [{
    "id": 23,
    "rus": "Выступление",
    "tat": "Чыгыш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Чыгыш"
}, {
    "id": 27,
    "rus": "Парень",
    "tat": "Егет",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Егет"
}, {
    "id": 18,
    "rus": "Мысль, идея",
    "tat": "Фикер",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Фикер"
}, {
    "id": 12,
    "rus": "Семья",
    "tat": "Гаилә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Гаилә"
}, {
    "id": 16,
    "rus": "Служба, работа",
    "tat": "Хезмәт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Хезмәт"
}, {
    "id": 2,
    "rus": "Хозяйство",
    "tat": "Хуҗалык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Хуҗалык"
}, {
    "id": 26,
    "rus": "Управление",
    "tat": "Идарә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Идарә"
}, {"id": 31, "rus": "Дом", "tat": "Өй", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Өй"}, {
    "id": 340,
    "rus": "город",
    "tat": "шәһәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=шәһәр"
}, {"id": 29, "rus": "Вода", "tat": "Су", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Су"}, {
    "id": 13,
    "rus": "Рубль",
    "tat": "Сум",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Сум"
}, {
    "id": 9,
    "rus": "Ученик, читатель",
    "tat": "Укучы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Укучы"
}, {
    "id": 4,
    "rus": "Он/она/оно, сын",
    "tat": "Ул",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Ул"
}, {
    "id": 14,
    "rus": "Место",
    "tat": "Урын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Урын"
}, {
    "id": 30,
    "rus": "Время, пора",
    "tat": "Вакыт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Вакыт"
}, {
    "id": 334,
    "rus": "ладно",
    "tat": "ярар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ярар"
}, {
    "id": 32,
    "rus": "Помощь, поддержка",
    "tat": "Ярдәм",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Ярдәм"
}, {
    "id": 7,
    "rus": "Центр",
    "tat": "Үзәк",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Үзәк"
}, {
    "id": 35,
    "rus": "Отдел, собрание",
    "tat": "Оешма",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Оешма"
}, {
    "id": 58,
    "rus": "Луна, месяц",
    "tat": "Ай",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Ай"
}, {
    "id": 61,
    "rus": "Деньги",
    "tat": "Акча",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Акча"
}, {
    "id": 49,
    "rus": "Промежуток, расстояние",
    "tat": "Ара",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Ара"
}, {
    "id": 69,
    "rus": "Голова, ум",
    "tat": "Баш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Баш"
}, {
    "id": 20,
    "rus": "Знание",
    "tat": "Белем",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Белем"
}, {
    "id": 71,
    "rus": "Религия, вера",
    "tat": "Дин",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Дин"
}, {"id": 134, "rus": "мама", "tat": "әни", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=әни"}, {
    "id": 59,
    "rus": "Наука",
    "tat": "Фән",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Фән"
}, {
    "id": 62,
    "rus": "Информация",
    "tat": "Мәгълүмат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мәгълүмат"
}, {
    "id": 41,
    "rus": "Область",
    "tat": "Өлкә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Өлкә"
}, {
    "id": 64,
    "rus": "Вид, образ, облик",
    "tat": "Рәвеш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Рәвеш"
}, {
    "id": 53,
    "rus": "Состояние",
    "tat": "Хәл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Хәл"
}, {"id": 452, "rus": "весна", "tat": "яз", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=яз"}, {
    "id": 22,
    "rus": "Творчество",
    "tat": "Иҗат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Иҗат"
}, {
    "id": 136,
    "rus": "девочка",
    "tat": "кыз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кыз"
}, {
    "id": 52,
    "rus": "Жизнь, бытие",
    "tat": "Тормыш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Тормыш"
}, {
    "id": 60,
    "rus": "Заместитель",
    "tat": "Урынбасар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Урынбасар"
}, {
    "id": 70,
    "rus": "Руководитель",
    "tat": "Җитәкче",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Җитәкче"
}, {"id": 371, "rus": "гора", "tat": "тау", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тау"}, {
    "id": 36,
    "rus": "Период, этап, эпоха",
    "tat": "Чор",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Чор"
}, {
    "id": 25,
    "rus": "Средство",
    "tat": "Чара",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Чара"
}, {
    "id": 33,
    "rus": "Cтепень, уровень, авторитет",
    "tat": "Дәрәҗә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Дәрәҗә"
}, {
    "id": 65,
    "rus": "Произведение",
    "tat": "Әсәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Әсәр"
}, {"id": 68, "rus": "Запах", "tat": "Ис", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Ис"}, {
    "id": 75,
    "rus": "Мир",
    "tat": "Дөнья",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Дөнья"
}, {
    "id": 6,
    "rus": "Имя, название",
    "tat": "Исем",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Исем"
}, {"id": 72, "rus": "День", "tat": "Көн", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Көн"}, {
    "id": 89,
    "rus": "Цель",
    "tat": "Максат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Максат"
}, {
    "id": 84,
    "rus": "Случай",
    "tat": "Очрак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Очрак"
}, {
    "id": 79,
    "rus": "Возможность",
    "tat": "Мөмкинлек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мөмкинлек"
}, {
    "id": 85,
    "rus": "Председатель",
    "tat": "Рәис",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Рәис"
}, {
    "id": 77,
    "rus": "Число, количество",
    "tat": "Сан",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Сан"
}, {
    "id": 92,
    "rus": "Война",
    "tat": "Сугыш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Сугыш"
}, {
    "id": 90,
    "rus": "Вопрос",
    "tat": "Сорау",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Сорау"
}, {
    "id": 86,
    "rus": "Рост, прирост",
    "tat": "Үсеш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Үсеш"
}, {
    "id": 78,
    "rus": "Возраст",
    "tat": "Яшь",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Яшь"
}, {
    "id": 358,
    "rus": "аптека",
    "tat": "даруханә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=даруханә"
}, {
    "id": 376,
    "rus": "озеро",
    "tat": "күл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=күл"
}, {
    "id": 140,
    "rus": "ребёнок",
    "tat": "бала",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бала"
}, {
    "id": 11,
    "rus": "Результат, итог",
    "tat": "Нәтиҗә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Нәтиҗә"
}, {
    "id": 42,
    "rus": "Действие",
    "tat": "Гамәл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Гамәл"
}, {
    "id": 367,
    "rus": "государство",
    "tat": "дәүләт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=дәүләт"
}, {
    "id": 21,
    "rus": "Работа, труд",
    "tat": "Эш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Эш"
}, {
    "id": 352,
    "rus": "можно",
    "tat": "мөмкин",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мөмкин"
}, {
    "id": 341,
    "rus": "больница",
    "tat": "хастаханә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=хастаханә"
}, {
    "id": 137,
    "rus": "младенец",
    "tat": "бәби",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бәби"
}, {
    "id": 132,
    "rus": "младший брат",
    "tat": "эне",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=эне"
}, {
    "id": 139,
    "rus": "бабушка",
    "tat": "әби",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=әби"
}, {
    "id": 128,
    "rus": "родственники",
    "tat": "туганнар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=туганнар"
}, {
    "id": 38,
    "rus": "Человек",
    "tat": "Кеше",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Кеше"
}, {
    "id": 76,
    "rus": "Задача, проблема",
    "tat": "Мәсьәлә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мәсьәлә"
}, {
    "id": 127,
    "rus": "родственник",
    "tat": "туган",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=туган"
}, {
    "id": 345,
    "rus": "церковь",
    "tat": "чиркәү",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чиркәү"
}, {
    "id": 343,
    "rus": "библиотека",
    "tat": "китапханә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=китапханә"
}, {
    "id": 133,
    "rus": "папа",
    "tat": "әти",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=әти"
}, {
    "id": 135,
    "rus": "мальчик",
    "tat": "малай",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=малай"
}, {
    "id": 129,
    "rus": "сестра, тётя",
    "tat": "апа",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=апа"
}, {
    "id": 131,
    "rus": "брат, дядя",
    "tat": "абый",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=абый"
}, {"id": 518, "rus": "живот", "tat": "эч", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=эч"}, {
    "id": 152,
    "rus": "праздник",
    "tat": "бәйрәм",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бәйрәм"
}, {
    "id": 368,
    "rus": "народ",
    "tat": "халык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=халык"
}, {
    "id": 154,
    "rus": "магазин",
    "tat": "кибет",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кибет"
}, {
    "id": 149,
    "rus": "английский язык",
    "tat": "инглиз теле",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=инглиз теле"
}, {
    "id": 145,
    "rus": "слово",
    "tat": "сүз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сүз"
}, {
    "id": 160,
    "rus": "идти",
    "tat": "барырга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=барырга"
}, {
    "id": 165,
    "rus": "понимать",
    "tat": "аңларга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=аңларга"
}, {
    "id": 166,
    "rus": "спрашивать, просить",
    "tat": "сорарга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сорарга"
}, {
    "id": 159,
    "rus": "знать",
    "tat": "белергә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=белергә"
}, {
    "id": 141,
    "rus": "друг",
    "tat": "дус",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=дус"
}, {
    "id": 142,
    "rus": "плохой, плохо",
    "tat": "начар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=начар"
}, {
    "id": 162,
    "rus": "возвращаться",
    "tat": "кайтырга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кайтырга"
}, {
    "id": 164,
    "rus": "слушать",
    "tat": "тыңларга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тыңларга"
}, {
    "id": 144,
    "rus": "часы, час",
    "tat": "сәгать",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сәгать"
}, {
    "id": 147,
    "rus": "татарский язык",
    "tat": "татар теле",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=татар теле"
}, {
    "id": 157,
    "rus": "учиться, читать",
    "tat": "укырга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=укырга"
}, {
    "id": 151,
    "rus": "по-английски",
    "tat": "инглизчә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=инглизчә"
}, {
    "id": 148,
    "rus": "русский язык",
    "tat": "рус теле",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=рус теле"
}, {
    "id": 150,
    "rus": "по-русски",
    "tat": "русча",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=русча"
}, {
    "id": 459,
    "rus": "черный",
    "tat": "кара",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кара"
}, {
    "id": 355,
    "rus": "деревня",
    "tat": "авыл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=авыл"
}, {
    "id": 24,
    "rus": "Женщина, жена",
    "tat": "Хатын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Хатын"
}, {
    "id": 51,
    "rus": "Культура",
    "tat": "Мәдәният",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мәдәният"
}, {
    "id": 354,
    "rus": "песня",
    "tat": "җыр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җыр"
}, {
    "id": 365,
    "rus": "великий",
    "tat": "бөек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бөек"
}, {
    "id": 351,
    "rus": "можно?",
    "tat": "мөмкинме?",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мөмкинме?"
}, {"id": 366, "rus": "страна", "tat": "ил", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ил"}, {
    "id": 83,
    "rus": "Численность, счёт",
    "tat": "Исәп",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Исәп"
}, {
    "id": 67,
    "rus": "Книга",
    "tat": "Китап",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Китап"
}, {
    "id": 360,
    "rus": "мечеть",
    "tat": "мәчет",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мәчет"
}, {
    "id": 353,
    "rus": "урок",
    "tat": "дәрес",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=дәрес"
}, {
    "id": 174,
    "rus": "играть",
    "tat": "уйнарга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=уйнарга"
}, {
    "id": 167,
    "rus": "сказать",
    "tat": "әйтергә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=әйтергә"
}, {
    "id": 168,
    "rus": "брать",
    "tat": "алырга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=алырга"
}, {
    "id": 169,
    "rus": "продавать",
    "tat": "сатарга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сатарга"
}, {
    "id": 170,
    "rus": "отвечать",
    "tat": "җавап бирергә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җавап бирергә"
}, {
    "id": 172,
    "rus": "встречаться",
    "tat": "очрашырга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=очрашырга"
}, {
    "id": 362,
    "rus": "здание",
    "tat": "бина",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бина"
}, {
    "id": 364,
    "rus": "древний",
    "tat": "борынгы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=борынгы"
}, {
    "id": 382,
    "rus": "грязный",
    "tat": "пычрак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=пычрак"
}, {
    "id": 383,
    "rus": "чистый",
    "tat": "чиста",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чиста"
}, {
    "id": 384,
    "rus": "высокий",
    "tat": "биек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=биек"
}, {
    "id": 385,
    "rus": "низкий",
    "tat": "тәбәнәк",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тәбәнәк"
}, {
    "id": 387,
    "rus": "красивый",
    "tat": "матур",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=матур"
}, {
    "id": 388,
    "rus": "некрасивый",
    "tat": "ямьсез",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ямьсез"
}, {
    "id": 389,
    "rus": "вкусный",
    "tat": "тәмле",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тәмле"
}, {
    "id": 369,
    "rus": "музеи",
    "tat": "музейлар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=музейлар"
}, {
    "id": 370,
    "rus": "район",
    "tat": "район",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=район"
}, {
    "id": 372,
    "rus": "равнина",
    "tat": "болын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=болын"
}, {
    "id": 373,
    "rus": "природа",
    "tat": "табигать",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=табигать"
}, {
    "id": 374,
    "rus": "лес",
    "tat": "урман",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=урман"
}, {
    "id": 377,
    "rus": "сад",
    "tat": "бакча",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бакча"
}, {
    "id": 378,
    "rus": "широкий",
    "tat": "киң",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=киң"
}, {
    "id": 379,
    "rus": "узкий",
    "tat": "тар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тар"
}, {
    "id": 381,
    "rus": "маленький",
    "tat": "кечкенә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кечкенә"
}, {
    "id": 392,
    "rus": "горячий",
    "tat": "кайнар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кайнар"
}, {
    "id": 394,
    "rus": "полезный",
    "tat": "файдалы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=файдалы"
}, {
    "id": 395,
    "rus": "бесполезный",
    "tat": "файдасыз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=файдасыз"
}, {
    "id": 390,
    "rus": "невкусный",
    "tat": "тәмсез",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тәмсез"
}, {
    "id": 396,
    "rus": "далёкий",
    "tat": "ерак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ерак"
}, {
    "id": 375,
    "rus": "река",
    "tat": "елга",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=елга"
}, {
    "id": 391,
    "rus": "сладкий",
    "tat": "баллы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=баллы"
}, {
    "id": 407,
    "rus": "улица",
    "tat": "урам",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=урам"
}, {
    "id": 408,
    "rus": "дом",
    "tat": "йорт, өй",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=йорт, өй"
}, {
    "id": 400,
    "rus": "мягкий",
    "tat": "йомшак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=йомшак"
}, {
    "id": 401,
    "rus": "твёрдый",
    "tat": "каты",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=каты"
}, {
    "id": 402,
    "rus": "утро",
    "tat": "иртә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=иртә"
}, {
    "id": 404,
    "rus": "вечер",
    "tat": "кич",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кич"
}, {
    "id": 405,
    "rus": "ночь",
    "tat": "төн",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=төн"
}, {
    "id": 406,
    "rus": "гость",
    "tat": "кунак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кунак"
}, {
    "id": 410,
    "rus": "старый",
    "tat": "иске",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=иске"
}, {
    "id": 411,
    "rus": "новый",
    "tat": "яңа",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=яңа"
}, {
    "id": 412,
    "rus": "этаж",
    "tat": "кат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кат"
}, {
    "id": 413,
    "rus": "комната",
    "tat": "бүлмә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бүлмә"
}, {
    "id": 417,
    "rus": "мебель",
    "tat": "өй жиһазы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=өй жиһазы"
}, {
    "id": 418,
    "rus": "холодильник",
    "tat": "суыткыч",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=суыткыч"
}, {
    "id": 419,
    "rus": "стиральная машина",
    "tat": "кер юу машинасы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кер юу машинасы"
}, {
    "id": 420,
    "rus": "окно",
    "tat": "тәрәзә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тәрәзә"
}, {
    "id": 397,
    "rus": "близкий",
    "tat": "якын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=якын"
}, {
    "id": 398,
    "rus": "глубокий",
    "tat": "тирән",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тирән"
}, {
    "id": 423,
    "rus": "гостиная",
    "tat": "кунак бүлмәсе",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кунак бүлмәсе"
}, {
    "id": 399,
    "rus": "неглубокий, мелкий",
    "tat": "сай",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сай"
}, {
    "id": 425,
    "rus": "кухня",
    "tat": "аш бүлмәсе",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=аш бүлмәсе"
}, {
    "id": 422,
    "rus": "лестница",
    "tat": "баскыч",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=баскыч"
}, {
    "id": 426,
    "rus": "детская",
    "tat": "балалар бүлмәсе",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=балалар бүлмәсе"
}, {
    "id": 427,
    "rus": "ванная комната",
    "tat": "юыну бүлмәсе",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=юыну бүлмәсе"
}, {
    "id": 428,
    "rus": "стол",
    "tat": "өстәл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=өстәл"
}, {
    "id": 429,
    "rus": "стул",
    "tat": "урындык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=урындык"
}, {
    "id": 430,
    "rus": "шкаф",
    "tat": "шкаф",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=шкаф"
}, {
    "id": 431,
    "rus": "пылесос",
    "tat": "тузан суыргыч",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тузан суыргыч"
}, {
    "id": 432,
    "rus": "подушка",
    "tat": "мендәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мендәр"
}, {
    "id": 433,
    "rus": "кровать",
    "tat": "карават",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=карават"
}, {
    "id": 434,
    "rus": "одеяло",
    "tat": "юрган",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=юрган"
}, {
    "id": 435,
    "rus": "коврик",
    "tat": "палас",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=палас"
}, {
    "id": 436,
    "rus": "светлый",
    "tat": "якты",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=якты"
}, {
    "id": 437,
    "rus": "удобный",
    "tat": "уңайлы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=уңайлы"
}, {
    "id": 439,
    "rus": "там",
    "tat": "анда",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=анда"
}, {
    "id": 440,
    "rus": "здесь",
    "tat": "монда",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=монда"
}, {
    "id": 441,
    "rus": "тёплый",
    "tat": "җылы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җылы"
}, {
    "id": 443,
    "rus": "дождь",
    "tat": "яңгыр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=яңгыр"
}, {
    "id": 444,
    "rus": "ветер",
    "tat": "җил",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җил"
}, {
    "id": 445,
    "rus": "снег",
    "tat": "кар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кар"
}, {
    "id": 446,
    "rus": "любовь",
    "tat": "мәхәббәт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мәхәббәт"
}, {
    "id": 449,
    "rus": "завтра",
    "tat": "иртәгә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=иртәгә"
}, {
    "id": 450,
    "rus": "вчера",
    "tat": "кичә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кичә"
}, {
    "id": 451,
    "rus": "погода",
    "tat": "һава торышы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=һава торышы"
}, {
    "id": 453,
    "rus": "лето",
    "tat": "җәй",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җәй"
}, {
    "id": 462,
    "rus": "зеленый",
    "tat": "яшел",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=яшел"
}, {
    "id": 463,
    "rus": "серый",
    "tat": "соры",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=соры"
}, {
    "id": 465,
    "rus": "фиолетовый",
    "tat": "шәмәхә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=шәмәхә"
}, {
    "id": 466,
    "rus": "один",
    "tat": "бер",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бер"
}, {"id": 467, "rus": "два", "tat": "ике", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ике"}, {
    "id": 468,
    "rus": "три",
    "tat": "өч",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=өч"
}, {
    "id": 469,
    "rus": "четыре",
    "tat": "дүрт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=дүрт"
}, {
    "id": 470,
    "rus": "пять",
    "tat": "биш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=биш"
}, {
    "id": 471,
    "rus": "шесть",
    "tat": "алты",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=алты"
}, {
    "id": 473,
    "rus": "восемь",
    "tat": "сигез",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сигез"
}, {
    "id": 474,
    "rus": "девять",
    "tat": "тугыз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тугыз"
}, {
    "id": 475,
    "rus": "десять",
    "tat": "ун",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ун"
}, {
    "id": 476,
    "rus": "цветок",
    "tat": "чәчәк",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чәчәк"
}, {
    "id": 478,
    "rus": "рыба",
    "tat": "балык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=балык"
}, {"id": 479, "rus": "мясо", "tat": "ит", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ит"}, {
    "id": 480,
    "rus": "курица",
    "tat": "тавык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тавык"
}, {
    "id": 481,
    "rus": "птица",
    "tat": "кош",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кош"
}, {
    "id": 483,
    "rus": "растение",
    "tat": "үсемлек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=үсемлек"
}, {
    "id": 484,
    "rus": "одежда",
    "tat": "кием",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кием"
}, {
    "id": 485,
    "rus": "брюки",
    "tat": "чалбар",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чалбар"
}, {
    "id": 487,
    "rus": "шапка",
    "tat": "башлык, баш киеме",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=башлык, баш киеме"
}, {"id": 458, "rus": "белый", "tat": "ак", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ак"}, {
    "id": 457,
    "rus": "желтый",
    "tat": "сары",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сары"
}, {
    "id": 460,
    "rus": "розовый",
    "tat": "алсу",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=алсу"
}, {
    "id": 495,
    "rus": "рука",
    "tat": "кул",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кул"
}, {
    "id": 514,
    "rus": "глаз",
    "tat": "күз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=күз"
}, {
    "id": 488,
    "rus": "обувь",
    "tat": "аяк киеме",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=аяк киеме"
}, {
    "id": 489,
    "rus": "верхняя одежда",
    "tat": "өс киеме",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=өс киеме"
}, {
    "id": 490,
    "rus": "детская одежда",
    "tat": "балалар киеме",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=балалар киеме"
}, {
    "id": 491,
    "rus": "косметика",
    "tat": "бизәнү әйберләре",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бизәнү әйберләре"
}, {
    "id": 492,
    "rus": "игрушка",
    "tat": "уенчык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=уенчык"
}, {
    "id": 493,
    "rus": "юбка",
    "tat": "итәк",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=итәк"
}, {
    "id": 496,
    "rus": "облако",
    "tat": "болыт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=болыт"
}, {
    "id": 497,
    "rus": "сегодня",
    "tat": "бүген",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бүген"
}, {
    "id": 500,
    "rus": "погода",
    "tat": "һава торышы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=һава торышы"
}, {
    "id": 503,
    "rus": "осень",
    "tat": "көз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=көз"
}, {
    "id": 504,
    "rus": "зима",
    "tat": "кыш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кыш"
}, {
    "id": 505,
    "rus": "красный",
    "tat": "кызыл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кызыл"
}, {
    "id": 507,
    "rus": "тело",
    "tat": "тән",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тән"
}, {
    "id": 509,
    "rus": "палец",
    "tat": "бармак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бармак"
}, {
    "id": 513,
    "rus": "ухо",
    "tat": "колак",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=колак"
}, {
    "id": 515,
    "rus": "нос",
    "tat": "борын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=борын"
}, {
    "id": 517,
    "rus": "рот",
    "tat": "авыз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=авыз"
}, {
    "id": 510,
    "rus": "лицо, страница",
    "tat": "бит",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бит"
}, {
    "id": 511,
    "rus": "спина",
    "tat": "арка",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=арка"
}, {
    "id": 512,
    "rus": "волосы",
    "tat": "чәч, чәчләр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чәч, чәчләр"
}, {
    "id": 519,
    "rus": "язык",
    "tat": "тел",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тел"
}, {
    "id": 521,
    "rus": "напиток",
    "tat": "эчемлек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=эчемлек"
}, {
    "id": 522,
    "rus": "хлеб",
    "tat": "икмәк, ипи",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=икмәк, ипи"
}, {
    "id": 523,
    "rus": "масло",
    "tat": "май",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=май"
}, {
    "id": 524,
    "rus": "молоко",
    "tat": "сөт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сөт"
}, {
    "id": 525,
    "rus": "яйцо",
    "tat": "күкәй, йомырка",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=күкәй, йомырка"
}, {"id": 527, "rus": "чай", "tat": "чәй", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=чәй"}, {
    "id": 528,
    "rus": "мёд",
    "tat": "бал",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бал"
}, {
    "id": 529,
    "rus": "фрукты",
    "tat": "җилэк-җимеш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җилэк-җимеш"
}, {
    "id": 530,
    "rus": "овощ",
    "tat": "яшелчә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=яшелчә"
}, {
    "id": 532,
    "rus": "морковь",
    "tat": "кишер",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кишер"
}, {
    "id": 533,
    "rus": "огурец",
    "tat": "кыяр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кыяр"
}, {
    "id": 534,
    "rus": "капуста",
    "tat": "кәбестә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кәбестә"
}, {
    "id": 535,
    "rus": "яблоко",
    "tat": "алма",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=алма"
}, {"id": 538, "rus": "суп", "tat": "аш", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=аш"}, {
    "id": 539,
    "rus": "каша",
    "tat": "ботка",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ботка"
}, {
    "id": 540,
    "rus": "соль",
    "tat": "тоз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тоз"
}, {
    "id": 541,
    "rus": "скидка",
    "tat": "ташлама",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ташлама"
}, {
    "id": 543,
    "rus": "дорогой (о цене)",
    "tat": "кыйбат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=кыйбат"
}, {
    "id": 544,
    "rus": "цена",
    "tat": "бәя",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бәя"
}, {
    "id": 545,
    "rus": "медведь",
    "tat": "аю",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=аю"
}, {
    "id": 546,
    "rus": "лиса",
    "tat": "төлке",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=төлке"
}, {
    "id": 548,
    "rus": "заяц",
    "tat": "куян",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=куян"
}, {
    "id": 57,
    "rus": "Привет",
    "tat": "Сәлам",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Сәлам"
}, {
    "id": 19,
    "rus": "Сотрудник",
    "tat": "Хезмәткәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Хезмәткәр"
}, {
    "id": 40,
    "rus": "Дорога, путь",
    "tat": "Юл",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Юл"
}, {
    "id": 74,
    "rus": "Сила, могущество",
    "tat": "Көч",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Көч"
}, {
    "id": 93,
    "rus": "Просвещение, образование",
    "tat": "Мәгариф",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мәгариф"
}, {
    "id": 155,
    "rus": "школа",
    "tat": "мәктәп",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=мәктәп"
}, {
    "id": 55,
    "rus": "Мусульманин",
    "tat": "Мөселман",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Мөселман"
}, {
    "id": 87,
    "rus": "Встреча",
    "tat": "Очрашу",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Очрашу"
}, {
    "id": 50,
    "rus": "Часть, доля, порция",
    "tat": "Өлеш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Өлеш"
}, {
    "id": 95,
    "rus": "Стихотворение",
    "tat": "Шигырь",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Шигырь"
}, {
    "id": 94,
    "rus": "Сторона",
    "tat": "Тараф",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Тараф"
}, {
    "id": 63,
    "rus": "История",
    "tat": "Тарих",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Тарих"
}, {
    "id": 175,
    "rus": "учитель",
    "tat": "укытучы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=укытучы"
}, {
    "id": 363,
    "rus": "столица",
    "tat": "башкала",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=башкала"
}, {
    "id": 551,
    "rus": "корова",
    "tat": "сыер",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сыер"
}, {
    "id": 552,
    "rus": "лошадь",
    "tat": "ат",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ат"
}, {
    "id": 554,
    "rus": "дружба",
    "tat": "дуслык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=дуслык"
}, {
    "id": 556,
    "rus": "надежда",
    "tat": "өмет",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=өмет"
}, {
    "id": 34,
    "rus": "Представитель",
    "tat": "Вәкил",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Вәкил"
}, {
    "id": 43,
    "rus": "Земля",
    "tat": "Җир",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Җир"
}, {
    "id": 173,
    "rus": "заплатить",
    "tat": "түләргә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=түләргә"
}, {
    "id": 158,
    "rus": "работать",
    "tat": "эшләргә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=эшләргә"
}, {
    "id": 386,
    "rus": "рядом с",
    "tat": "янында",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=янында"
}, {
    "id": 163,
    "rus": "разговаривать",
    "tat": "сөйләшергә",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сөйләшергә"
}, {
    "id": 380,
    "rus": "большой",
    "tat": "зур",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=зур"
}, {
    "id": 393,
    "rus": "холодный",
    "tat": "салкын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=салкын"
}, {
    "id": 409,
    "rus": "квартира",
    "tat": "фатир",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=фатир"
}, {
    "id": 416,
    "rus": "остановка",
    "tat": "тукталыш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=тукталыш"
}, {
    "id": 421,
    "rus": "дверь",
    "tat": "ишек",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ишек"
}, {
    "id": 424,
    "rus": "спальня",
    "tat": "йокы бүлмәсе",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=йокы бүлмәсе"
}, {
    "id": 442,
    "rus": "холодный",
    "tat": "салкын",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=салкын"
}, {
    "id": 448,
    "rus": "сегодня",
    "tat": "бүген",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бүген"
}, {
    "id": 461,
    "rus": "синий",
    "tat": "зәңгәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=зәңгәр"
}, {
    "id": 464,
    "rus": "коричневый",
    "tat": "көрән",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=көрән"
}, {
    "id": 472,
    "rus": "семь",
    "tat": "җиде",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=җиде"
}, {
    "id": 477,
    "rus": "дерево",
    "tat": "агач",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=агач"
}, {
    "id": 482,
    "rus": "животное",
    "tat": "хайван",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=хайван"
}, {
    "id": 486,
    "rus": "рубашка, платье",
    "tat": "күлмәк",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=күлмәк"
}, {"id": 516, "rus": "зуб", "tat": "теш", "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=теш"}, {
    "id": 520,
    "rus": "еда",
    "tat": "ашамлык",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=ашамлык"
}, {
    "id": 526,
    "rus": "пирог",
    "tat": "бәлеш",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бәлеш"
}, {
    "id": 531,
    "rus": "картофель",
    "tat": "бәрәңге",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бәрәңге"
}, {
    "id": 536,
    "rus": "сахар",
    "tat": "шикәр",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=шикәр"
}, {
    "id": 542,
    "rus": "дешёвый",
    "tat": "арзан",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=арзан"
}, {
    "id": 547,
    "rus": "волк",
    "tat": "бүре",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бүре"
}, {
    "id": 549,
    "rus": "собака",
    "tat": "эт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=эт"
}, {
    "id": 550,
    "rus": "кошка",
    "tat": "песи",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=песи"
}, {
    "id": 555,
    "rus": "уважение",
    "tat": "хөрмәт",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=хөрмәт"
}, {
    "id": 146,
    "rus": "по-татарски",
    "tat": "татарча",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=татарча"
}, {
    "id": 138,
    "rus": "дедушка",
    "tat": "бабай",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=бабай"
}, {
    "id": 81,
    "rus": "Девочка/девушка, дочь",
    "tat": "Кыз",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=Кыз"
}, {
    "id": 130,
    "rus": "младшая сестра",
    "tat": "сеңел",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=сеңел"
}, {
    "id": 156,
    "rus": "детский сад",
    "tat": "балалар бакчасы",
    "audio": "https://talgat.corpus.tatar/search/rhvoice.php?t=балалар бакчасы"
}]

const initialState: CounterState = {
    status: 'idle',
    words: words,
    phrases: []
};

export const getWordsAsync = createAsyncThunk(
    'counter/fetchWords',
    async () => {
        const response = await fetchWords();
        return response.data;
    }
);

export const getPhrasesAsync = createAsyncThunk(
    'counter/fetchPhrases',
    async () => {
        const response = await fetchPhrases();
        console.log('response', response)
        return response.data;
    }
);

export const gameSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWordsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWordsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.words = action.payload;
            })
            .addCase(getWordsAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getPhrasesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPhrasesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.phrases = action.payload;
            })
            .addCase(getPhrasesAsync.rejected, (state) => {
                state.status = 'failed';
            })

    },
});

export const selectGame = (state: RootState) => state.game
// export const {increment, decrement, incrementByAmount} = gameSlice.actions;


export default gameSlice.reducer;
