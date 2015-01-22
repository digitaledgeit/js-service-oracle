var ServiceLocator = require('..');

var locator = new ServiceLocator();
locator
	.set('Eyes', [{type: 'Eye'}, {type: 'Eye'}])
	.set('Ears', [{type: 'Ear'}, {type: 'Ear'}])
	.set('Nose', {type: 'Nose'})
	.set('Mouth', {type: 'Mouth'})
	.factory('Hair', './example/hair')
	.factory('Face', function(locator) {
		return {
			eyes: locator.get('Eyes'),
			ears: locator.get('Ears'),
			nose: locator.get('Nose'),
			mouth: locator.get('Mouth'),
			hair: locator.get('Hair')
		}
	})
;

var face = locator.get('Face');
console.log(face);