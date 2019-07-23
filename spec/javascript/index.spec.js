import React from 'react'

import { shallow } from 'enzyme'
import Index from 'components/Index'

const data = [{ "date":"2019-06-27",
                "entries":[{ "id":7,"amount":"5.55","currency":"USD","user_id":3,
                             "created_at":"2019-06-27T18:17:02.504Z",
                             "updated_at":"2019-06-27T18:17:02.504Z",
                             "name":"Netflix" }] }]

describe('Index component', () => {
  it('shows the data properly', () => {
    const wrapper = shallow(<Index groupedEntries={data} />)

    const title   = wrapper.find('h4').text()
    const date    = wrapper.find('b').text()
    const input1  = wrapper.find('input').at(0).props().defaultValue
    const input2  = wrapper.find('input').at(1).props().defaultValue
    const input3  = wrapper.find('input').at(2).props().defaultValue

    expect(title).toEqual('Your Entries')
    expect(date).toEqual('6/27/2019')
    expect(input1).toEqual('Netflix')
    expect(input2).toEqual('5.55')
    expect(input3).toEqual('USD')
  })

  it.skip('removes entry', () => {
    const wrapper = shallow(<Index groupedEntries={data} />)

    const icon = wrapper.find('svg')

    expect(icon.lenght).toBe(1)

    expect(wrapper.find('input').length).toBe(3)

    // click on icon to remove entry

    // expect(wrapper.find('input').length).toBe(0)
  })
})
