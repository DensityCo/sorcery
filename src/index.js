import { resolve } from 'path';
import middleware from './utils/middleware.js';
import Node from './Node.js';
import Chain from './Chain.js';

export function load ( file, options ) {
	const { node, sourcesContentByPath, sourceMapByPath } = init( file, options );

	return node.load( sourcesContentByPath, sourceMapByPath )
		.then( () => node.isOriginalSource ? null : new Chain( node, sourcesContentByPath ) );
}

export function loadSync ( file, options = {} ) {
	const { node, sourcesContentByPath, sourceMapByPath } = init( file, options );

	node.loadSync( sourcesContentByPath, sourceMapByPath );
	return node.isOriginalSource ? null : new Chain( node, sourcesContentByPath );
}

function init ( file, options = {} ) {
	const node = new Node({ file });

	let sourcesContentByPath = {};
	let sourceMapByPath = {};

	if ( options.urlMiddleware ) {
		middleware.addMiddleware('url', options.urlMiddleware);
	}

	if ( options.content ) {
		Object.keys( options.content ).forEach( key => {
			sourcesContentByPath[ resolve( key ) ] = options.content[ key ];
		});
	}

	if ( options.sourcemaps ) {
		Object.keys( options.sourcemaps ).forEach( key => {
			sourceMapByPath[ resolve( key ) ] = options.sourcemaps[ key ];
		});
	}

	return { node, sourcesContentByPath, sourceMapByPath };
}
