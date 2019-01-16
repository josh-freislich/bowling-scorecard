import React from 'react'
import Scoreboard from './scoreboard'
import { shallow } from 'enzyme'

describe('Scoreboard component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Scoreboard />)
  })
  const allTests = [
      [[[4,4]],                             [4, 8],      'handles a score of 4,4 in first frame'],
      [[[4,6], [5, 0]],                     [0, 20],     'handles a score of 4,6 | 5,0 in first 2 frames'],
      [[[10], [5, 4]],                      [4, 28],     'handles a score of 10 | 5,4 in first 2 frames'],
      [[[10],[5,4],[4,3],[3,2],[2,1]],      [1, 43],     'handles a strike score in first frame'],
      [[[5,4],[4,3],[3,2],[10],[2,3]],      [3, 41],     'handles a strike score in second last frame'],
      [[[5,4],[4,3],[3,2],[2,1],[10]],      ['X', 34],   'handles a strike score in last frame'],
      [[[5,5],[4,3],[3,2],[2,1]],           [1, 29],     'handles a spare score in first frame'],
      [[[4,3],[3,2],[5,5],[2,1]],           [1, 27],     'handles a spare score in second last frame'],
      [[[4,3],[3,2],[2,1],[5,5]],           ['/', 25],   'handles a spare score in last frame'],
      [[[4,3],[3,2],[10],[5,5],[2,1]],      [1, 47],     'handles a combination of strike & spare score'],
      [[[4,3],[0,2],[2,1]],                 [1, 12],     'handles a first ball gutter score'],
      [[[4,3],[3,0],[2,1]],                 [1, 13],     'handles a second ball gutter score'],
      [[[4,3],[0,0],[2,1]],                 [1, 10],     'handles a both ball gutter score'],
      [[[4,3],[3,2],[2,1]],                 [1, 15],     'handles a remaining pins at end of frame score'],
      [[[10],[10],[4,3],[3,2],[2,1]],       [1, 56],     'handles a double score'],
      [[[10],[10],[10],[4,3],[3,2],[2,1]],  [1, 86],     'handles a turkey score'],
      [[[10],[10],[10],[10],[10],[10],[10],[10],[10],[9, 1, 10]],       ['X', 279],  'handles spare and strike on last frame'],
      [[[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 9, 1]],       ['/', 289],  'handles strike and spare on last frame'],
      [[[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 8, 1]],       [1, 287],    'handles strike and failed split on last frame'],
      [[[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10, 3]],      [3, 293],    'handles two strikes and some pins on last frame'],
      [[[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10, 10]],     ['X', 300],  'handles perfect score'],
      [[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],   [0, 0],      'handles lowest possible score'],
  ]
  it('starts with a total of 0', () => {
    const { lastBallText, currentScoreText } = getStagedComponent(wrapper)
    expect(lastBallText).toEqual('Last Ball Score: -')
    expect(currentScoreText).toEqual('Current score: 0')
  })

  for (const test of allTests) {
      const [scores, [last, total], description] = test
      it(description, () => {
          const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
          expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
          expect(currentScoreText).toEqual(`Current score: ${total}`)
      })
  }
})

/*****
*  Some helper functions for repeated code
* */
const createStagedComponent = (wrapper, scores) => {
  setStagedComponent(wrapper, scores)
  return getStagedComponent(wrapper)
}

const setStagedComponent = (wrapper, scores) => {
  wrapper.setState({ scores })
  const lastScore = scores[scores.length-1].pop()
  wrapper.find('input').simulate('change', {target: { value: lastScore }})
  wrapper.find('button').simulate('click')
}

const getStagedComponent = (wrapper) => {
  const lastBallText = wrapper.find('p').first().text()
  const currentScoreText = wrapper.find('p').last().text()
  return {
    lastBallText,
    currentScoreText
  }
}
