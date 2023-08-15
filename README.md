# js-arabic-reshaper

Это форк пакета `js-arabic-reshaper`, нужный для подстановки лигатур арабской вязи, для корректного отображения текста на арабском языке.

Интерфейс пакета представлен функцией 

```ts
reshape(input: string, options?: Options): string
```

используется которая как-то так:

```javascript
const Reshaper = require('arabic-reshaper');

// Простой вызов
var reshapedWord = Reshaper.reshape(arabicWord);

// Вызов с опциями
Reshaper.reshape(arabicWord, {
  ligatures: true,
  delete_harakat: false
});
```

## Что сделано в этом форке

В пакете был оптимизирован алгоритм подстановки лигатур. Вместо линейного поиска здесь используется trie, что дает сложность O(logN) вместо оригинальной O(N).

## Обновление лигатур

Внедрение trie внесло некоторые сложности в обновление пакета. Теперь, чтобы добавить или убрать что-то нужно поменять оригинальный конфиг в файле `originals.js` и выполнить команду

```
npm run gen
```

Команда сгенерирует 2 файла `letters.json` и `ligas.json`, содержимое которых нужно вручную вставит в `index.js` в значение переменных `LETTERS` и `LIGATURES_TRIE` соответственно.

[README оригинального пакета](ORIGIN_README.md)