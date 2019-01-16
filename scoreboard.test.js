import React from 'react'
import Scoreboard from './scoreboard'
import { shallow } from 'enzyme'

describe('Scoreboard component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Scoreboard />)
  })

  it('starts with a total of 0', () => {
    const { lastBallText, currentScoreText } = getStagedComponent(wrapper)
    expect(lastBallText).toEqual('Last Ball Score: -')
    expect(currentScoreText).toEqual('Current score: 0')
  })

  it('handles a strike score in first frame', () => {
    const scores = [[10],[5,4],[4,3],[3,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 43];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a strike score in second last frame', () => {
    const scores = [[5,4],[4,3],[3,2],[10],[2,3]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [3, 41];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a strike score in last frame', () => {
    const scores = [[5,4],[4,3],[3,2],[2,1],[10]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = ['X', 34];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a spare score if first frame', () => {
    const scores = [[5,5],[4,3],[3,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 29];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a spare score if second last frame', () => {
    const scores = [[4,3],[3,2],[5,5],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 27];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a spare score if last frame', () => {
    const scores = [[4,3],[3,2],[2,1],[5,5]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = ['/', 25];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a combination of strike & spare score', () => {
    const scores = [[4,3],[3,2],[10],[5,5],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 47];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a first ball gutter score', () => {
    const scores = [[4,3],[0,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 12];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a second ball gutter score', () => {
    const scores = [[4,3],[3,0],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 13];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a both ball gutter score', () => {
    const scores = [[4,3],[0,0],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 10];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a remaining pins at end of frame score', () => {
    const scores = [[4,3],[3,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 15];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a double score', () => {
    const scores = [[10],[10],[4,3],[3,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 56];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles a turkey score', () => {
    const scores = [[10],[10],[10],[4,3],[3,2],[2,1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [1, 86];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles spare and strike on last frame', () => {
    const scores = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[9, 1, 10]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = ['X', 279];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles strike and spare on last frame', () => {
    const scores = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 9, 1]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = ['/', 289];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles strike and failed split on last frame', () => {
    const scores = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 9, 0]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [0, 288];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles two strikes and some pins on last frame', () => {
    const scores = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10, 3]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [3, 293];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles perfect score', () => {
    const scores = [[10],[10],[10],[10],[10],[10],[10],[10],[10],[10, 10, 10]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = ['X', 300];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
  it('handles lowest possible score', () => {
    const scores = [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    const { lastBallText, currentScoreText } = createStagedComponent(wrapper, scores)
    const [ last, total ] = [0, 0];

    expect(lastBallText).toEqual(`Last Ball Score: ${last}`)
    expect(currentScoreText).toEqual(`Current score: ${total}`)
  })
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
