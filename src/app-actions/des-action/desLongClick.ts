import ClickElementLongPageobject from '../../pageobjects/des/clickElementLong.pageobject'

export default (
  type: 'link' | 'selector',
  selector: string
) => {
    ClickElementLongPageobject.clickElementLong(type, selector)
};
