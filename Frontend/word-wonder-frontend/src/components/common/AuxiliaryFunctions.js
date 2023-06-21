export function TimeSince(creationDate){
    console.log(creationDate)
		var seconds = Math.floor(
			(new Date() - new Date(creationDate)) / 1000
		);
		
		var interval = seconds / 31536000;

		if (interval > 1) {
			console.log(Math.floor(interval) + " years");
			return Math.floor(interval) + " years ago";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			console.log(Math.floor(interval) + " months");
			return Math.floor(interval) + " months ago";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			console.log(Math.floor(interval) + " days");
			return Math.floor(interval) + " days ago";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			console.log(Math.floor(interval) + " hours");
			return Math.floor(interval) + " hours ago";
		}
		interval = seconds / 60;
		if (interval > 1) {
			console.log(Math.floor(interval) + " minutes ago");
			return Math.floor(interval) + " minutes ago";
		}
		console.log(Math.floor(seconds) + " seconds ago");
		return Math.floor(seconds) + " seconds ago";
}