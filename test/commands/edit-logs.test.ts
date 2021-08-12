import {expect, test} from '@oclif/test'

describe('edit-logs', () => {
  test
  .stdout()
  .command(['edit-logs'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['edit-logs', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
