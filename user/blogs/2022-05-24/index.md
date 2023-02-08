---
title: 人生苦短，我用React Hook Form
summary: ''
published: '2022-05-24T00:00:00.000+08:00'
cover: ./cover.webp
coverStyle: 'TOP'
coverCaption: Photo by <a href="https://www.pexels.com/zh-tw/@adrien-olichon-1257089?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Adrien Olichon</a> on <a href="https://www.pexels.com/zh-tw/photo/5091783/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a>
tags:
  - ['react','FE','react hook form']

---

有一次剛好跟同事聊到 **「我們認為的」** ant design form的缺點，像是是串接非antd或者較為複雜的component時可能要使用render props導致JSX會比想像中的難閱讀又或者是對於form value型別保障以及讓我們最痛苦的Form.Item的內建樣式。

讓我們開始思考有沒有更簡單優雅的方法讓我去使用做表單元件。

以下文章所提到的 ant design form 是指在 ant-design 這個package裡面的 Form 元件。

先打個預防針：「沒有絕對好的解決方案，只有適不適合而已」

## TL;DR

比起 antd form 我更喜歡 react hook form有以下三個原因：

  1. 語法較為簡潔且在綁定元件時多數情況下不影響我 component 的 layer
  2. 型別系統較為完善
  3. 沒有內建樣式

## 當初使用 ant design form的原因

雖然當初技術選型時我並沒有參與，但我想應該是因為想說就用ant design做為主要的UI library了，那就使用它內建的form吧，最早是在公司內部產品裡使用，因為主要就是一個後台網站所以開發起來並沒有遇到太多的阻礙，頂多偶而murmur沒有型別推斷。而且剛好那時也正在從antd v3的form migrate到 v4版本（沈醉在將HOC的形式改為使用Hook的喜悅中）
所以並沒有特別去在意antd Form不方便的地方，以當時的時空背景來說是不必花這個成本將antd Form換成其他Form。

為了開發方便，我們就盡量讓每個專案都使用一樣的technical stack，所以在另外一個面向外部使用者的網頁專案就遇到很多頭痛的問題，而剛好去年下半年的開發能量都放在那邊。

因為大部分後台會用到的元件antd都有提供，即使沒有的話可能只要做小部分的改寫，或甚至可以跟設計師協調可不可以不用做得那麼複雜（完美）。

但如果是在開發前台網頁的話在盡量配合設計師的情況下，除了將antd元件改寫要費一段心力以外，可能還有form field在與「不只是一個單純的component」進行串接時會很頭痛以及form的內建樣式也讓我們感到很厭煩。

所有的小問題全部加起來後，讓我們開發體驗變得十分的糟。

特別說明一下何謂「不只是一個單純的component」因為antd form的綁定機制的關係，如果Form.Item wrap的是一個input加上一個div 就會無法綁定成功，而這也代表我們表單狀態的相關實作就是會跟UI實作有耦合，所以我如果要成功綁定就是要將這個組合先組成一個component或者用render props去實現。

我們來看看ant design 的Form是如何綁定component的：

```jsx
const [form] = Form.useForm();
<Form form={form} >
  <Form.Item name='name'>
    <Input/>
  </Form.Item>
</Form>
```

稍微解釋一下是利用antd Form所提供的custom hook來產生 form instance，然後將這個form instance放入到Form元件裡。

`Form.Item` 可以傳入name來註冊form的field，然後會將它所wrap的元件進行綁定，大致上就是有自動的傳入onChange及value這兩個props。

## 那為什麼會選擇 React Hook Form
最一開始只是剛好在逛github時瞄到而已，看一下文件後覺得好像蠻有料的感覺是可以解決我們之前在antd form遇到的痛點，然後也因爲那時接手的專案算是可以放手使用各種新奇技術的專案，就開始在小部分沒什麼影響的地方開始試用看看。

### 綁定方式

```jsx
const { register, control, handleSubmit} = useForm()
<form onSubmit={handleSubmit()}>
<input {...register('name')} />
<Controller
 render={({ field }) => <input {...field} />}
 name="name"
 control={control} 
 defaultValue=""  />
</form>
```

大致上就是使用 `register` 以及 `control` 來進行綁定。基本上 `register` 是用在input元件上的。 `register()` 傳入我們要綁定的field name，而 `control` 的彈性就比較大了，它則是利用render props 來將state與update state的function傳進component裡。

在 `control` 這個例子裡的field 就包含了 `onChange` 、 `onBlur` 、 `value` 、 `name` 、 `ref` 這些值。通常我們比較常使用到 `onChange` 以及 `value` 也就是我們一般在實作controlled component 會用到的東西。

從這邊也看的出來我component與表單的綁定並不是依賴於Form.item 這類的東西，而是直接在我要綁定的component進行綁定。這樣最大的好處是我的「表單綁定與UI沒有了耦合」，在antd 裡如果遇到有複數個component是放在同一row之類的排版需求，就會寫得有點醜大概就是：
（而且還沒加上要清除 Form.item 預設樣式的程式碼）

```jsx
<div>
 <Form.item name='name1'>
  <input/>
 </Form.item>
 <Form.item name='name2'>
   <input/>
 </Form.item>
</div>
但換成 React Hook Form

<div>
  <input {...register('name1')}/>
  <input {...register('name2')}/>
</div>
```

總之因為antd form的綁定機制我必須一直讓 `Form.item` 影響到我JSX中component的層級關係，這點降低了不少開發者體驗。

### 型別系統

而真正讓我們愛上 React Hook Form 最主要的原因應該是「型別」，在React Hook Form的 `useForm` 可以傳入generic type來限制這個form能有哪些field以及這些field value的型別是什麼。

所有相關的API都擁有type保障，確保我們的 `fieldName` 一定是合法的。以 `register` 為例，接下來註冊元件時就只能使用我們傳入 `useForm` 的interface的key

<ImgZoom src="/2022-05-24/type_image_1.webp" alt="/2022-05-24/type_image_1.webp" class="h-full object-cover">
</ImgZoom>

<ImgZoom src="/2022-05-24/type_image_2.webp" alt="/2022-05-24/type_image_2.webp" class="h-full object-cover">
</ImgZoom>

當然antd form他的 `useForm` 也擁有泛型，但最大的問題是我們在 `Form.item` 要寫下 `name=""` 時是無法推斷出這個 formInstance可以使用哪些name ，
另外一點是即使 `getFieldsValue` 可以推斷出整個Form的型別，但當我 `getFieldValue(fieldName)` 想要取單一個field的值時這時他的型別會是any。並無法利用 `fieldName` 來推導出這個 `fieldValue` 的型別

### 覆寫樣式

在antd裡 `Form` 及 `Form.item` 同時處理了樣式與表單狀態， 也就是他們都是有預設樣式的，好處是你不用額外寫什麼樣式這個表單看起來可以整整齊齊。但如果想要有額外的設計時就會必須要一直override掉，在後台網站裡並不會有那麼多設計需求，但在給一般的使用者時，當然還是會想辦法讓自己的網站變得比較好看。

但也會導致我們要花很多工在override掉 Form 及 Form.item 的樣式，我們主要是使用styled-component當作我們的樣式管理，所以在override樣式時我們傾向直接重新宣告一個Styled component：

<ImgZoom src="/2022-05-24/styled_component.webp" alt="/2022-05-24/styled_component.webp" class="h-full object-cover">
</ImgZoom>

但寫久了就會覺得，樣式這個東西應該我form裡面所控制的元件或者外面容器在控制，到底與form有什麼關係。

但在react hook form裡，我們就可以把樣式的事情專注在原本寫的component。

---

這篇文本來是在去年9月開始撰寫但一直拖到現在才寫完 ，期間剛好換了工作，也在這裡碰到 material ui + formik這個組合。

相比之下 Formik 有點像是antd form給我的感覺，都會用一個大的component（Formik）wrap住一堆component（field），藉此來提供form 的context。

但剛好這一陣子也在將Formik migrate 成 react hook form，也著手處理一些比較複雜的form refactor 其中用到了 react hook from的FormProvider 、useFormContext 及useController 這類在拆分Form的語法，也許將來有更多react hook form相關心得可以分享。