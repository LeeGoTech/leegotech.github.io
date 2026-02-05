const liveTime = document.getElementById("liveTime");

const formatter = new Intl.DateTimeFormat("en-US", {
	timeZone: "Asia/Manila",
	month: "long",
	day: "numeric",
	year: "numeric",
	hour: "numeric",
	minute: "2-digit",
	second: "2-digit",
	hour12: true,
});

const updateTime = () => {
	const now = new Date();
	const parts = formatter.formatToParts(now);

	const datePart = `${parts.find(p => p.type === "month").value} ${
			parts.find(p => p.type === "day").value
	}, ${parts.find(p => p.type === "year").value}`;

	const timePart = `${parts.find(p => p.type === "hour").value}:${
			parts.find(p => p.type === "minute").value
	}:${parts.find(p => p.type === "second").value} ${
			parts.find(p => p.type === "dayPeriod").value
	}`;

	liveTime.textContent = `${datePart} \u00b7 ${timePart}`;
};

updateTime();
setInterval(updateTime, 1000);