/**
 * @jest-environment node
 */
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';

const OUTPUT_DIST = path.join(__dirname, '../testBuild');
const OUTPUT_FILENAME = 'bundle.js';
const OUTPUT_FILE = path.join(OUTPUT_DIST, OUTPUT_FILENAME);

const getConfig = (entry, options) => ({
  context: __dirname,
  entry,
  output: {
    path: OUTPUT_DIST,
    filename: OUTPUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: [
          'vue-loader',
          {
            loader: path.resolve(__dirname, '../src/index.js'),
            options,
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
});

describe('Test vue replace loader:', () => {
  test('> Replace foo', (done) => {
    const target = './fixtures/example.vue';
    const options = {
      values: [
        { regex: /__FOO__/g, replacement: 'foo123' },
        { regex: /__BAR__/g, replacement: 'bar456' },
        { regex: /__BIZ__/g, replacement: 'biz789' },
      ],
    };

    webpack(getConfig(target, options), (buildError) => {
      expect(buildError).toBe(null);

      fs.readFile(OUTPUT_FILE, 'utf8', (readError, content) => {
        expect(readError).toBe(null);
        expect(typeof content).not.toBe(null);
        expect(content).not.toContain('__FOO__');
        expect(content).toContain('foo123');
        expect(content).not.toContain('__BAR__');
        expect(content).toContain('bar456');
        expect(content).not.toContain('cls-__BIZ__');
        expect(content).toContain('cls-biz789');
        done();
      });
    });
  });
});
