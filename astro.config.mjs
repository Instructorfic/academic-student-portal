// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// `site` (y `base`, si el sitio no se publica en la raíz del dominio)
	// deben configurarse cuando se confirme la organización/dominio real
	// de GitHub Pages — ver docs/PUBLICACION.md. No se asume un valor
	// aquí para no inventar una URL de hosting no confirmada.
	site: 'https://academy.ficlabs.com.mx',
	integrations: [
		starlight({
			title: 'FIC Academy',
			description:
				'Recursos, actividades y materiales académicos para estudiantes de la Facultad de Informática Culiacán, UAS.',
			
			favicon: '/favicon.png',
			logo: {
				light: './src/assets/logo-fic-1.png',
				dark: './src/assets/logo-fic-2.png',
				alt: 'Facultad de Informática Culiacán — Universidad Autónoma de Sinaloa',
			},
			customCss: ['./src/styles/custom.css'],
			social: [],
			sidebar: [
				{
					label: 'Inicio',
					link: '/',
				},
				{
					label: 'Materias',
					items: [
						{
							label: 'DBA — Gestión de Seguridad y Desempeño de BD',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/dba' },
								{
									label: 'Unidad 1 — Introducción a la Gestión de Bases de Datos',
									items: [
										{ label: 'Introducción', slug: 'materias/dba/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/dba/unidad-01/presentacion',
										},
										{
											label: '1. El rol del DBA',
											slug: 'materias/dba/unidad-01/01-rol-del-dba',
										},
										{
											label: '2. Responsabilidades operativas',
											slug: 'materias/dba/unidad-01/02-responsabilidades-operativas',
										},
										{
											label: '3. Ambientes de trabajo',
											slug: 'materias/dba/unidad-01/03-ambientes-de-trabajo',
										},
										{
											label: '4. Arquitectura relacional',
											slug: 'materias/dba/unidad-01/04-arquitectura-relacional',
										},
										{
											label: '5. Arquitectura NoSQL',
											slug: 'materias/dba/unidad-01/05-arquitectura-nosql',
										},
										{
											label: '6. Cierre y autoevaluación',
											slug: 'materias/dba/unidad-01/06-cierre-y-autoevaluacion',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/dba/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/dba/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/dba/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/dba/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/dba/unidad-01/actividades/actividad-5' },
												{ label: 'Actividad 6', slug: 'materias/dba/unidad-01/actividades/actividad-6' },
												{ label: 'Actividad 7 (evidencia oficial)', slug: 'materias/dba/unidad-01/actividades/actividad-7' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — PostgreSQL',
													slug: 'materias/dba/unidad-01/laboratorios/laboratorio-1-postgresql',
												},
												{
													label: 'Laboratorio 2 — MongoDB',
													slug: 'materias/dba/unidad-01/laboratorios/laboratorio-2-mongodb',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/dba/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/dba/unidad-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/dba/unidad-01/referencias/lecturas-complementarias',
												},
												{
													label: 'Casos reales completos',
													slug: 'materias/dba/unidad-01/referencias/casos-reales',
												},
											],
										},
									],
								},
								{
									label: 'Unidad 2 — Seguridad, privacidad y control de acceso',
									items: [
										{ label: 'Introducción', slug: 'materias/dba/unidad-02' },
										{
											label: 'Presentación',
											slug: 'materias/dba/unidad-02/presentacion',
										},
										{
											label: '1. Principios de seguridad e inyección SQL/NoSQL',
											slug: 'materias/dba/unidad-02/01-principios-de-seguridad-e-inyeccion',
										},
										{
											label: '2. Control de acceso: usuarios, roles y permisos',
											slug: 'materias/dba/unidad-02/02-control-de-acceso-usuarios-roles-permisos',
										},
										{
											label: '3. Protección de datos sensibles',
											slug: 'materias/dba/unidad-02/03-proteccion-de-datos-sensibles',
										},
										{
											label: '4. Cifrado en tránsito y en reposo',
											slug: 'materias/dba/unidad-02/04-cifrado-en-transito-y-en-reposo',
										},
										{
											label: '5. Privacidad y cumplimiento normativo',
											slug: 'materias/dba/unidad-02/05-privacidad-y-cumplimiento-normativo',
										},
										{
											label: '6. Hardening de servidores de bases de datos',
											slug: 'materias/dba/unidad-02/06-hardening-servidor-bases-datos',
										},
										{
											label: '7. Cierre y autoevaluación',
											slug: 'materias/dba/unidad-02/07-cierre-y-autoevaluacion',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/dba/unidad-02/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/dba/unidad-02/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/dba/unidad-02/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/dba/unidad-02/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/dba/unidad-02/actividades/actividad-5' },
												{ label: 'Actividad 6', slug: 'materias/dba/unidad-02/actividades/actividad-6' },
												{ label: 'Actividad 7', slug: 'materias/dba/unidad-02/actividades/actividad-7' },
												{ label: 'Actividad 8 (evidencia oficial)', slug: 'materias/dba/unidad-02/actividades/actividad-8' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Inyección SQL y NoSQL',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-1-inyeccion-sql-nosql',
												},
												{
													label: 'Laboratorio 2 — Control de acceso',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-2-control-de-acceso',
												},
												{
													label: 'Laboratorio 3 — Protección de datos y cifrado',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-3-proteccion-de-datos-y-cifrado',
												},
												{
													label: 'Laboratorio 4 — Hardening',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-4-hardening',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/dba/unidad-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/dba/unidad-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/dba/unidad-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Taller Integrador de Especialización',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/taller-integrador' },
								{
									label: 'Bloque I — Del problema al producto',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-01' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-01/presentacion',
										},
										{
											label: '1. Desarrollo profesional de software',
											slug: 'materias/taller-integrador/bloque-01/01-desarrollo-profesional-de-software',
										},
										{
											label: '2. Conformación de equipos',
											slug: 'materias/taller-integrador/bloque-01/02-conformacion-de-equipos',
										},
										{
											label: '3. Introducción a Scrum',
											slug: 'materias/taller-integrador/bloque-01/03-introduccion-a-scrum',
										},
										{
											label: '4. Definición del proyecto',
											slug: 'materias/taller-integrador/bloque-01/04-definicion-del-proyecto',
										},
										{
											label: '5. Sprint 0 — qué debes producir',
											slug: 'materias/taller-integrador/bloque-01/05-sprint-0-que-debes-producir',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/taller-integrador/bloque-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-4' },
												{ label: 'Actividad 5 (evidencia oficial)', slug: 'materias/taller-integrador/bloque-01/actividades/actividad-5' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Laravel desde cero',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-1-laravel-desde-cero',
												},
												{
													label: 'Laboratorio 2 — CRUD con Laravel',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-2-crud-laravel',
												},
												{
													label: 'Laboratorio 3 — Historias de usuario',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-3-historias-de-usuario',
												},
												{
													label: 'Laboratorio 4 — Sprint 0',
													slug: 'materias/taller-integrador/bloque-01/laboratorios/laboratorio-4-sprint-0',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/taller-integrador/bloque-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/taller-integrador/bloque-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/taller-integrador/bloque-01/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
								{
									label: 'Bloque II — Desarrollo colaborativo y arquitectura',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-02' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-02/presentacion',
										},
										{
											label: '1. Git y control de versiones',
											slug: 'materias/taller-integrador/bloque-02/01-git-y-control-de-versiones',
										},
										{
											label: '2. Trabajo colaborativo con Git',
											slug: 'materias/taller-integrador/bloque-02/02-trabajo-colaborativo-con-git',
										},
										{
											label: '3. Integración del trabajo',
											slug: 'materias/taller-integrador/bloque-02/03-integracion-del-trabajo',
										},
										{
											label: '4. Arquitectura de software',
											slug: 'materias/taller-integrador/bloque-02/04-arquitectura-de-software',
										},
										{
											label: '5. Patrones de diseño',
											slug: 'materias/taller-integrador/bloque-02/05-patrones-de-diseno',
										},
										{
											label: '6. Primer incremento — qué debes producir',
											slug: 'materias/taller-integrador/bloque-02/06-primer-incremento-que-debes-producir',
										},
										{
											label: '7. Cierre y resumen',
											slug: 'materias/taller-integrador/bloque-02/07-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/taller-integrador/bloque-02/actividades/actividad-5' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Git colaborativo',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-1-git-colaborativo',
												},
												{
													label: 'Laboratorio 2 — Arquitectura inicial',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-2-arquitectura-inicial',
												},
												{
													label: 'Laboratorio 3 — Patrón de diseño',
													slug: 'materias/taller-integrador/bloque-02/laboratorios/laboratorio-3-patron-de-diseno',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/taller-integrador/bloque-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/taller-integrador/bloque-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/taller-integrador/bloque-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Lógica de Programación y Pensamiento Computacional',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/logica-programacion' },
								{
									label: 'Unidad I — Introducción a la programación',
									items: [
										{ label: 'Introducción', slug: 'materias/logica-programacion/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/logica-programacion/unidad-01/presentacion',
										},
										{
											label: '1. Importancia de aprender a programar',
											slug: 'materias/logica-programacion/unidad-01/01-importancia-de-programar',
										},
										{
											label: '2. Computadora, algoritmo, programa y lenguaje',
											slug: 'materias/logica-programacion/unidad-01/02-computadora-algoritmo-programa-lenguaje',
										},
										{
											label: '3. Herramientas para representar algoritmos',
											slug: 'materias/logica-programacion/unidad-01/03-herramientas-para-representar-algoritmos',
										},
										{
											label: '4. Razonamiento lógico y pensamiento computacional',
											slug: 'materias/logica-programacion/unidad-01/04-razonamiento-logico-y-pensamiento-computacional',
										},
										{
											label: '5. Resolución de problemas en forma algorítmica',
											slug: 'materias/logica-programacion/unidad-01/05-resolucion-de-problemas-en-forma-algoritmica',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/logica-programacion/unidad-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-5' },
												{ label: 'Actividad 6 (evidencia de cierre)', slug: 'materias/logica-programacion/unidad-01/actividades/actividad-6' },
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/logica-programacion/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/logica-programacion/unidad-01/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/logica-programacion/unidad-01/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
								{
									label: 'Unidad II — Elementos algorítmicos básicos',
									items: [
										{ label: 'Introducción', slug: 'materias/logica-programacion/unidad-02' },
										{
											label: 'Presentación',
											slug: 'materias/logica-programacion/unidad-02/presentacion',
										},
										{
											label: '1. Tipos de datos',
											slug: 'materias/logica-programacion/unidad-02/01-tipos-de-datos',
										},
										{
											label: '2. Expresiones',
											slug: 'materias/logica-programacion/unidad-02/02-expresiones',
										},
										{
											label: '3. Operadores',
											slug: 'materias/logica-programacion/unidad-02/03-operadores',
										},
										{
											label: '4. Identificadores',
											slug: 'materias/logica-programacion/unidad-02/04-identificadores',
										},
										{
											label: '5. Constantes y variables',
											slug: 'materias/logica-programacion/unidad-02/05-constantes-y-variables',
										},
										{
											label: '6. Funciones matemáticas',
											slug: 'materias/logica-programacion/unidad-02/06-funciones-matematicas',
										},
										{
											label: '7. Resolución de expresiones',
											slug: 'materias/logica-programacion/unidad-02/07-resolucion-de-expresiones',
										},
										{
											label: '8. Herramientas de compilación',
											slug: 'materias/logica-programacion/unidad-02/08-herramientas-de-compilacion',
										},
										{
											label: '9. Cierre y resumen',
											slug: 'materias/logica-programacion/unidad-02/09-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-4' },
												{ label: 'Actividad 5', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-5' },
												{ label: 'Actividad 6', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-6' },
												{ label: 'Actividad 7', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-7' },
												{ label: 'Actividad 8 (evidencia de cierre)', slug: 'materias/logica-programacion/unidad-02/actividades/actividad-8' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — PSeInt',
													slug: 'materias/logica-programacion/unidad-02/laboratorios/laboratorio-1-pseint',
												},
												{
													label: 'Laboratorio 2 — Resolución de expresiones',
													slug: 'materias/logica-programacion/unidad-02/laboratorios/laboratorio-2-resolucion-expresiones',
												},
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/logica-programacion/unidad-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/logica-programacion/unidad-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/logica-programacion/unidad-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
								{
									label: 'Unidad III — Metodología para la solución de problemas algorítmicos',
									items: [
										{ label: 'Introducción', slug: 'materias/logica-programacion/unidad-03' },
										{
											label: 'Presentación',
											slug: 'materias/logica-programacion/unidad-03/presentacion',
										},
										{
											label: 'Banco de ejercicios',
											items: [
												{ label: 'Cómo usar el banco', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios' },
												{ label: 'Análisis del problema', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/analisis-del-problema' },
												{ label: 'Datos, variables, constantes e identificadores', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/datos-variables-constantes-identificadores' },
												{ label: 'Estrategias de solución', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/estrategias-de-solucion' },
												{ label: 'Técnicas de análisis', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/tecnicas-de-analisis' },
												{ label: 'Pseudocódigo', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/pseudocodigo' },
												{ label: 'Prueba de escritorio y depuración', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/prueba-de-escritorio-y-depuracion' },
												{ label: 'Documentación', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/documentacion' },
												{ label: 'Estudio de caso integrador', slug: 'materias/logica-programacion/unidad-03/banco-ejercicios/estudio-de-caso-integrador' },
											],
										},
										{
											label: 'Plantillas de los instrumentos',
											items: [
												{ label: 'Índice de plantillas', slug: 'materias/logica-programacion/unidad-03/plantillas' },
												{ label: 'Hoja de trabajo — Propuesta algorítmica', slug: 'materias/logica-programacion/unidad-03/plantillas/hoja-trabajo-propuesta-algoritmica' },
												{ label: 'Propuesta algorítmica extendida', slug: 'materias/logica-programacion/unidad-03/plantillas/propuesta-algoritmica-extendida' },
												{ label: 'Ficha de trazado', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-trazado' },
												{ label: 'Ficha de depuración', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-depuracion' },
												{ label: 'Ficha de ordenamiento', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-ordenamiento' },
												{ label: 'Ficha de comparación', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-comparacion' },
												{ label: 'Ficha de transformación', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-transformacion' },
												{ label: 'Reto algorítmico', slug: 'materias/logica-programacion/unidad-03/plantillas/ficha-reto' },
											],
										},
										{
											label: 'Especificación de diagramas de flujo',
											slug: 'materias/logica-programacion/unidad-03/especificacion-diagramas-flujo',
										},
										{
											label: 'Traducción del pseudocódigo a PSeInt',
											slug: 'materias/logica-programacion/unidad-03/traduccion-a-pseint',
										},
									],
								},
							],
						},
						{
							label: 'Pruebas de Software',
							items: [
								{ label: 'Presentación de la materia', slug: 'materias/pruebas-software' },
								{
									label: 'Unidad I — Fundamentos de pruebas y aseguramiento de calidad',
									items: [
										{ label: 'Introducción', slug: 'materias/pruebas-software/unidad-01' },
										{
											label: 'Presentación',
											slug: 'materias/pruebas-software/unidad-01/presentacion',
										},
										{
											label: '1. Calidad de software',
											slug: 'materias/pruebas-software/unidad-01/01-calidad-de-software',
										},
										{
											label: '2. Garantía, aseguramiento, verificación y validación',
											slug: 'materias/pruebas-software/unidad-01/02-garantia-aseguramiento-verificacion-validacion',
										},
										{
											label: '3. Propósito de las pruebas de software',
											slug: 'materias/pruebas-software/unidad-01/03-proposito-de-las-pruebas',
										},
										{
											label: '4. Principios generales de pruebas',
											slug: 'materias/pruebas-software/unidad-01/04-principios-generales-de-pruebas',
										},
										{
											label: '5. Cobertura y métricas básicas',
											slug: 'materias/pruebas-software/unidad-01/05-cobertura-y-metricas-basicas',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/pruebas-software/unidad-01/06-cierre-y-resumen',
										},
										{
											label: 'Actividades',
											items: [
												{ label: 'Actividad 1', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-1' },
												{ label: 'Actividad 2', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-2' },
												{ label: 'Actividad 3', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-3' },
												{ label: 'Actividad 4', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-4' },
												{ label: 'Actividad 5 (evidencia oficial)', slug: 'materias/pruebas-software/unidad-01/actividades/actividad-5' },
											],
										},
										{
											label: 'Evaluación',
											slug: 'materias/pruebas-software/unidad-01/evaluacion',
										},
										{
											label: 'Referencias',
											slug: 'materias/pruebas-software/unidad-01/referencias',
										},
									],
								},
								{
									label: 'Unidad II — Requisitos, criterios de aceptación y trazabilidad',
									items: [
										{ label: 'Introducción', slug: 'materias/pruebas-software/unidad-02' },
										{
											label: 'Proyectos base',
											slug: 'materias/pruebas-software/unidad-02/proyectos-base',
										},
										{
											label: 'Presentación',
											slug: 'materias/pruebas-software/unidad-02/presentacion',
										},
										{
											label: '1. Requisitos funcionales, no funcionales y reglas de negocio',
											slug: 'materias/pruebas-software/unidad-02/01-requisitos-funcionales-no-funcionales-reglas-negocio',
										},
										{
											label: '2. Casos de uso e historias de usuario',
											slug: 'materias/pruebas-software/unidad-02/02-casos-de-uso-historias-usuario',
										},
										{
											label: '3. Criterios de aceptación y escenarios',
											slug: 'materias/pruebas-software/unidad-02/03-criterios-aceptacion-escenarios',
										},
										{
											label: '4. Trazabilidad y matriz de trazabilidad',
											slug: 'materias/pruebas-software/unidad-02/04-trazabilidad-matriz',
										},
										{
											label: '5. Más ejemplos aplicados',
											slug: 'materias/pruebas-software/unidad-02/05-segundo-ejemplo-aplicado',
										},
										{
											label: '6. Cierre y resumen',
											slug: 'materias/pruebas-software/unidad-02/06-cierre-y-resumen',
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1',
													slug: 'materias/pruebas-software/unidad-02/laboratorios/laboratorio-1-requisitos-reglas-negocio',
												},
												{
													label: 'Laboratorio 2',
													slug: 'materias/pruebas-software/unidad-02/laboratorios/laboratorio-2-criterios-aceptacion-escenarios',
												},
												{
													label: 'Laboratorio 3 (evidencia oficial)',
													slug: 'materias/pruebas-software/unidad-02/laboratorios/laboratorio-3-matriz-trazabilidad',
												},
											],
										},
										{
											label: 'Formato de la matriz de trazabilidad',
											slug: 'materias/pruebas-software/unidad-02/formato-matriz-trazabilidad',
										},
										{
											label: 'Evaluación',
											slug: 'materias/pruebas-software/unidad-02/evaluacion',
										},
										{
											label: 'Referencias',
											items: [
												{ label: 'Bibliografía', slug: 'materias/pruebas-software/unidad-02/referencias' },
												{
													label: 'Lecturas complementarias',
													slug: 'materias/pruebas-software/unidad-02/referencias/lecturas-complementarias',
												},
											],
										},
									],
								},
							],
						},
						{
							label: 'Otras materias (en preparación)',
							slug: 'materias',
						},
					],
				},
			],
		}),
	],
});
