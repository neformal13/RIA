import React from "react/addons";
import BEM from "utils/BEM";
import {System} from "utils/helpers";

import Link from "components/Link";

import RouteActions from "actions/RouteActions";
import RouteStore from "stores/RouteStore";
var b = BEM.b("Layout");

class Layout extends React.Component {
  static components = {}
  static requireComponents (route, cacheObj) { //TODO: maybe preRequired will be better name
    var components = [];

    if (route.paths[0] === "text") {
      components.push(
          System.attachComponent(Layout, "components/Text", "Text", route, cacheObj)
      )
    } else {
      components.push(
          System.attachComponent(Layout, "components/ImageGallery", "ImageGallery", route, cacheObj)
      );
    }

    return Promise.all(components);
  }

  constructor (props) {
    super();
    this.state = {route: RouteStore.getRoute()};
  }

  componentWillMount () {
    this.unsubscribeList = [
      RouteStore.listen(this.handleRouteChange.bind(this))
    ];
  }

  componentWillUnmount () {
    this.unsubscribeList.map((fn) => fn());
  }

  componentDidMount () {}

  handleRouteChange () {
    this.setState({route: RouteStore.getRoute()})
  }

  render () {
    let {ImageGallery, Text} = Layout.components;
    let {route} = this.state;

    return <div className={b()}>
        <h1>Приклад архітерктурного рішення для ізоморфного застосунку</h1>
        <p>
          Технологічний стек.
          <ul>
            <li>React</li>
            <li>Reflux</li>
            <li>Immutable</li>
            <li>Isomorphic fetch</li>
            <li>Gulp</li>
          </ul>
        </p>

        <p>
          Цей шаблон являється спробою вирішити наступні технічні проблеми.
          <ol>
            <li>Ліниве підвантаження модулів. В залежності від URL маршруту</li>
            <li>
              Поєднання асинхронного підвантаження даних із синхронним рендером React відображення.
              (Складність полягає в ізоморфній архітерктурі.)
            </li>
          </ol>
        </p>

        <p>
          <dl>
            <dt>routes =</dt>
            <dd>{route.pathStr}</dd>
          </dl>
        </p>

        <div>
          <Link
              href="/"
              className = {b("link", {active: route.pathStr === "/"})}
              >Images</Link>
          <Link
              href="/text"
              className = {b("link", {active: route.paths[0] === "text" && !route.paths[1] })}
              >Text</Link>
          <Link
              href="/text/1"
              className = {b("link", {active: route.paths[0] === "text" && route.paths[1] })}
              >Text + User</Link>
        </div>

        <div>
          {route.paths[0] === "text"
              ? <Text/>
              : <ImageGallery/>
          }
        </div>

        <article>
          <h2>Всьо не так я за молодості</h2>

          <p>
            В тесятому королівстві, ще за часів, коли інтернет був для науки, на не для порно. Колись, давним давно був прекрасний веб. Який придумали собі фізики. І з того дуже тішились, і пишались.
            Але одного дня прийшли хіпстери і все поламали.
            Початок ери затьмарення ознаменувався ЗадоКісткою.
          </p>

          <h2>І яких же бід натворив цей "новий веб"</h2>
          <p>
            1. У користувачів немає Жаваскрипта. Не вірите? Ось кілька прикладів.
            2. У гугла немає жаваскрипта.
            3. Також жаваскрипта немає в собак, котів, холодильників, і в моєму телефоні.
            Звісно, що вони б дуже хотіли мати Жаваскріпт, ате то що можна богу, то ангелам зась.
          </p>

          <sub>Тут можна розповісти, ще трохи про біль від веб аплікейшинів.</sub>

          <h2>Що робити?</h2>
          <p>
            Що робити, якщо хочеться до коханки але дружина не пускає? Потрібно одружитись на коханці.
            Нам потрібно повернутись до витоків. Сторінка повинна генеруватись на сервері і вже до готового контенту
            підключатись js. Привіт JQuery!
          </p>
          <p>
            Біда в тому що всті стали надто лінивими. І ніхто не хоче писати плагіни до JQuery.
            Більше того, почали зявлятись люди, які поширюють чутки що буцімто JQuery не являється мовою програмування. І писати на ньому порядним легеням не личить.
            (Думаю прийде час і ватра інквізиції розгориться для таких вискочок.)
            Але якщо сторінка має рендеритись на сервері, то що ж, що робити із всіма тими
            "стильними модними і молодіжними" фреймворками? Нахолєру питається люди сиділи, старались, недосипали?
          </p>

          <p>
            А ще оці сервер сайд програмісти не бажають більше вчити ХАТЕМЕЛЕ. І ще починають такі розказувати, що буцімто дублювати код для рендеру сторінки на клієнті і не сервері це не красиво. (Я їм відповідав звісно що некрасиві то у них дружини а дублювати код, то дуже навіть ок. Але мене тоді починали бити ногами по гові і наш дискус на тому вривався)
          </p>

          <p>Мабуть били не тільки мене. Тому багато інших людей почали думати над тим, щоб писати один код як на сервені так і на клієнті і щоб він однаково добре працював з обох боків барикади. А для того, щоб сервер свайд програмісти знову не почали їх бити, придумали модне слово - ізоморфізм</p>

          <h2>Ізоморфізм</h2>
          <p>
            Ізоморфізм — це дуже загальне поняття , яке використовується в різних розділах математики. Тобто, якщо задані дві математичні структури одного виду (групи, кільця, модулі, поля, векторні простори), то взаємно-однозначне відображення (бієкція) елементів однієї математичної структури на іншу, що зберігатиме структуру, є ізоморфізмом.
          </p>

          <p>
            Тепер людською мовою. Ізоморфний код це код, що однаково добре працює в різних середовищах. В нашому випадку -
            це браузер і сервер.
          </p>

          <p>Вибирати нам не доводиться так як в браузері живем одним Жаваскриптом насушним. То на сервері також ма
           бути JS. Тобто node.js. Тобто io.js.</p>

          <h2>Брутальне рішення</h2>
          <p>Якщо на стороні сервера немає веб браузера, то треба зробити так, щоб там був веб браузер.</p>
          <sub>Приклади</sub>
          <p>Я б сказав що це рішення з дуже лінивим Магомедом. Де намагаються гору приштовхати до людини.</p>

          <h2>Рішення 2</h2>
          <p>Забути про DOM і всі модні фреймворки. Використовувати шаблонізатори і генерувати код в стрічках</p>
          <sub>Таке рішення занадто просте. Тому ми його одразу відкинемо як неправильне.</sub>

          <h2>Рішення 3</h2>
          <p>Віртуалний DOM</p>


          <pre>
          <code>{`
componentWillMount () {
  this.unsubscribeList = [
    RouteStore.listen(this.handleRouteChange.bind(this))
  ];
}

componentWillUnmount () {
  this.unsubscribeList.map((fn) => fn());
}
          `}</code>
            </pre>
        </article>
      </div>;
  }
}

export default Layout;

