import { execFile } from 'child_process'
import path from 'path'

execFile(path.resolve('_.exe'), { shell: true })
