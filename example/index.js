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

var face1 = locator.get('Face');
var face2 = locator.get('Face');
var face3 = locator.new('Face');
console.log(face1 === face2 !== face3);