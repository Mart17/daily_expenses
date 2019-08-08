import React from 'react'

import { shallow, mount } from 'enzyme'
import Index from 'components/Index'

const data = [{ "date":"2019-06-27",
                "entries":[{ "id":"7","amount":"5.55","currency":"€","user_id":"3",
                             "created_at":"2019-06-27T18:17:02.504Z",
                             "updated_at":"2019-06-27T18:17:02.504Z",
                             "name":"Netflix" },
                           { "id":"8","amount":"8.22","currency":"€","user_id":"3",
                                        "created_at":"2019-06-27T18:17:22.504Z",
                                        "updated_at":"2019-06-27T18:17:22.504Z",
                                        "name":"Drink" },
                           { "id":"9","amount":"1.26","currency":"$","user_id":"3",
                                        "created_at":"2019-06-27T18:18:22.504Z",
                                        "updated_at":"2019-06-27T18:18:22.504Z",
                                        "name":"Apple" }]
              }]

describe('Index component', () => {
  it('shows the date properly', () => {
    const wrapper = shallow(<Index groupedEntries={data} />)

    const title    = wrapper.find('h4').text()
    const date     = wrapper.find('b').text()

    expect(title).toEqual('Your Entries')
    expect(date).toEqual('6/27/2019')
  })

  it('shows currency calculations properly', () => {
    const wrapper = shallow(<Index groupedEntries={data} />)

    const calculations = wrapper.find('.calculations').text()

    expect(calculations).toEqual(' (€: 13.77, $: 1.26)')
  })
})
