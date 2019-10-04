
var dateFormat = function () {
	token var = / d {1,4} | m {1,4} | aa (?: aa)? | ([HhMsTt]) \ 1? | [LloSZ] | "[^"] * "| '[^ '] *' / g,
	fuso horário = / \ b (?: [PMCEA] [SDP] T | (?: Pacífico | Montanha | Central | Leste | Atlântico) (?: Padrão | Luz do dia | Prevalência) Hora | (?: GMT | UTC) (?: [- +] \ d {4})?) \ b / g,
	fuso horárioClip = / [^ - + \ dA-Z] / g,
	pad = função (val, len) {
		val = String (val);
		len = len || 2;
		while (val.length <len) val = "0" + val;
		retorno val;
	};

	// Regexes e funções de suporte são armazenadas em cache através do fechamento
	função de retorno (data, máscara, utc) {
		var dF = dateFormat;

		// Você não pode fornecer utc se ignorar outros argumentos (use o prefixo da máscara "UTC:")
		if (argument.length == 1 && Object.prototype.toString.call (date) == "[string do objeto]" &&! / \ d / .test (data)) {
			máscara = data;
			data = indefinido;
		}

		// A passagem da data até a data aplica Date.parse, se necessário
		data = data? nova data (data): nova data;
		if (isNaN (date)) lança SyntaxError ("data inválida");

		mask = String (dF.masks [mask] || mask || dF.masks ["padrão"]);

		// Permite configurar o argumento utc através da máscara
		if (mask.slice (0, 4) == "UTC:") {
			mask = mask.slice (4);
			utc = true;
		}

		var _ = utc? "getUTC": "get",
		d = data [_ + "Data"] (),
		D = data [_ + "Dia"] (),
		m = data [_ + "Mês"] (),
		y = data [_ + "Ano completo"] (),
		H = data [_ + "Horas"] (),
		M = data [_ + "Minutos"] (),
		s = data [_ + "Segundos"] (),
		L = data [_ + "Milissegundos"] (),
		o = utc? 0: date.getTimezoneOffset (),
		flags = {
			d: d,
			dd: almofada (d),
			ddd: dF.i18n.dayNames [D],
			dddd: dF.i18n.dayNames [D + 7],
			m: m + 1,
			mm: almofada (m + 1)
			mmm: dF.i18n.monthNames [m],
			mmmm: dF.i18n.monthNames [m + 12],
			yy: String (y) .slice (2),
			aaaa: y,
			h: H% 12 || 12,
			hh: almofada (H% 12 || 12),
			H: H,
			HH: almofada (H),
			MILÍMETROS,
			MM: almofada (M),
			s: s,
			ss: almofada (s),
			l: almofada (L, 3),
			L: pad (L> 99? Math.round (L / 10): L),
			t: H <12? "a": "p",
			tt: H <12? "manhã tarde",
			T: H <12? "A": "P",
			TT: H <12? "MANHÃ TARDE",
			Z: utc? "UTC": (String (data) .match (fuso horário) || [""]). Pop (). Replace (timezoneClip, ""),
			o: (o> 0? "-": "+") + pad (Math.floor (Math.abs (o) / 60) * 100 + Math.abs (o)% 60, 4),
			S: ["th", "st", "nd", "rd"] [d% 10> 3? 0: (d% 100 - d% 10! = 10) * d% 10]
		};

		return mask.replace (token, function ($ 0) {
			devolver $ 0 em bandeiras? sinalizadores [$ 0]: fatia de US $ 0 (1, comprimento de US $ 0 - 1);
		});
	};
} ();

// Algumas seqüências de formato comuns
dateFormat.masks = {
	"padrão": "ddd mmm dd aaaa HH: MM: ss",
	shortDate: "m / d / aa",
	mediumDate: "mmm d, aaaa",
	longDate: "mmmm d, aaaa",
	fullDate: "dddd, mmmm d, aaaa",
	shortTime: "h: MM TT",
	mediumTime: "h: MM: ss TT",
	longTime: "h: MM: ss TT Z",
	isoDate: "aaaa-mm-dd",
	isoTime: "HH: MM: ss",
	isoDateTime: "aaaa-mm-dd'T'HH: MM: ss",
	isoUtcDateTime: "UTC: aaaa-mm-dd'T'HH: MM: ss'Z '"
};

// Strings de internacionalização
dateFormat.i18n = {
	dayNames: [
	"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb",
	"Domingo segunda terça quarta quinta sexta sábado"
	],
	monthNames: [
	"Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
	"Janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
	]
};

// Por conveniência...
Date.prototype.format = function (mask, utc) {
	dateFormat de retorno (this, mask, utc);
};
