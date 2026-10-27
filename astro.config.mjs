// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/**
 * Envuelve cada tabla del contenido en un contenedor con desplazamiento
 * horizontal, para que las tablas anchas (por ejemplo, la matriz de
 * trazabilidad) no se salgan del área de lectura.
 */
function envolverTablas() {
	const visitar = (nodo) => {
		if (!nodo.children) return;
		nodo.children = nodo.children.map((hijo) => {
			visitar(hijo);
			if (hijo.type === 'element' && hijo.tagName === 'table') {
				return {
					type: 'element',
					tagName: 'div',
					properties: { className: ['tabla-desplazable'] },
					children: [hijo],
				};
			}
			return hijo;
		});
	};
	return (arbol) => visitar(arbol);
}

// https://astro.build/config
export default defineConfig({
	markdown: {
		rehypePlugins: [envolverTablas],
	},
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
									label: 'Referencias de la materia',
									items: [
										{ label: 'Referencia DBA PostgreSQL', slug: 'materias/dba/referencias/postgresql-dba' },
										{ label: 'Referencia DBA MongoDB', slug: 'materias/dba/referencias/mongodb-dba' },
										{ label: 'Glosario', slug: 'materias/dba/referencias/glosario' },
									],
								},
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
											label: '4. Cifrado y protección técnica',
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
												{ label: 'Actividad 8 (integral)', slug: 'materias/dba/unidad-02/actividades/actividad-8' },
											],
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Protección y privacidad de datos',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-1-proteccion-y-privacidad-de-datos',
												},
												{
													label: 'Laboratorio 2 — Cifrado, credenciales y comunicaciones seguras',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-2-cifrado-credenciales-y-comunicaciones-seguras',
												},
												{
													label: 'Laboratorio 3 — Privacidad, cumplimiento y gobierno de los datos',
													slug: 'materias/dba/unidad-02/laboratorios/laboratorio-3-privacidad-cumplimiento-y-gobierno-de-los-datos',
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
								{
									label: 'Unidad 3 — Auditoría, trazabilidad y gobierno práctico de datos',
									items: [
										{ label: 'Introducción', slug: 'materias/dba/unidad-03' },
										{
											label: 'Presentación',
											slug: 'materias/dba/unidad-03/presentacion',
										},
										{
											label: '1. Auditoría de bases de datos',
											slug: 'materias/dba/unidad-03/01-auditoria-de-bases-de-datos',
										},
										{
											label: '2. Bitácoras en PostgreSQL',
											slug: 'materias/dba/unidad-03/02-bitacoras-en-postgresql',
										},
										{
											label: '3. Auditoría del dato',
											slug: 'materias/dba/unidad-03/03-auditoria-del-dato',
										},
										{
											label: '4. Trazabilidad en MongoDB Community',
											slug: 'materias/dba/unidad-03/04-trazabilidad-en-mongodb',
										},
										{
											label: '5. Conservación e interpretación de bitácoras',
											slug: 'materias/dba/unidad-03/05-conservacion-e-interpretacion-de-bitacoras',
										},
										{
											label: '6. Políticas prácticas de datos',
											slug: 'materias/dba/unidad-03/06-politicas-practicas-de-datos',
										},
										{
											label: '7. Gobierno práctico de datos',
											slug: 'materias/dba/unidad-03/07-gobierno-practico-de-datos',
										},
										{
											label: '8. Cierre de la unidad',
											slug: 'materias/dba/unidad-03/08-cierre-de-la-unidad',
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Bitácoras y auditoría del dato en PostgreSQL',
													slug: 'materias/dba/unidad-03/laboratorios/laboratorio-1-bitacoras-y-auditoria-del-dato-postgresql',
												},
												{
													label: 'Laboratorio 2 — Trazabilidad en MongoDB Community',
													slug: 'materias/dba/unidad-03/laboratorios/laboratorio-2-trazabilidad-mongodb',
												},
												{
													label: 'Laboratorio 3 — Políticas, gobierno de datos y evidencias',
													slug: 'materias/dba/unidad-03/laboratorios/laboratorio-3-politicas-gobierno-y-evidencias',
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
								{
									label: 'Bloque III — Construcción del sistema',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-03' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-03/presentacion',
										},
										{
											label: '1. Manejo de datos',
											slug: 'materias/taller-integrador/bloque-03/01-manejo-de-datos',
										},
										{
											label: '2. Desarrollo de componentes',
											slug: 'materias/taller-integrador/bloque-03/02-desarrollo-de-componentes',
										},
										{
											label: '3. Manejo de errores',
											slug: 'materias/taller-integrador/bloque-03/03-manejo-de-errores',
										},
										{
											label: '4. Pruebas automatizadas',
											slug: 'materias/taller-integrador/bloque-03/04-pruebas-automatizadas',
										},
										{
											label: '5. Datos de prueba',
											slug: 'materias/taller-integrador/bloque-03/05-datos-de-prueba',
										},
										{
											label: '6. Desarrollo seguro',
											slug: 'materias/taller-integrador/bloque-03/06-desarrollo-seguro',
										},
										{
											label: '7. Gestión de secretos',
											slug: 'materias/taller-integrador/bloque-03/07-gestion-de-secretos',
										},
										{
											label: '8. Integración continua',
											slug: 'materias/taller-integrador/bloque-03/08-integracion-continua',
										},
										{
											label: '9. Cierre y resumen',
											slug: 'materias/taller-integrador/bloque-03/09-cierre-y-resumen',
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Persistencia en PostgreSQL',
													slug: 'materias/taller-integrador/bloque-03/laboratorios/laboratorio-1-persistencia-postgresql',
												},
												{
													label: 'Laboratorio 2 — API REST del proyecto',
													slug: 'materias/taller-integrador/bloque-03/laboratorios/laboratorio-2-api-rest',
												},
												{
													label: 'Laboratorio 3 — Pruebas unitarias y de integración',
													slug: 'materias/taller-integrador/bloque-03/laboratorios/laboratorio-3-pruebas',
												},
												{
													label: 'Laboratorio 4 — Desarrollo seguro',
													slug: 'materias/taller-integrador/bloque-03/laboratorios/laboratorio-4-desarrollo-seguro',
												},
												{
													label: 'Laboratorio 5 — Integración continua con GitLab CI',
													slug: 'materias/taller-integrador/bloque-03/laboratorios/laboratorio-5-integracion-continua',
												},
											],
										},
									],
								},
								{
									label: 'Bloque IV — Contenedores, despliegue y escalabilidad',
									items: [
										{ label: 'Introducción', slug: 'materias/taller-integrador/bloque-04' },
										{
											label: 'Presentación',
											slug: 'materias/taller-integrador/bloque-04/presentacion',
										},
										{
											label: '1. ¿Qué es un contenedor?',
											slug: 'materias/taller-integrador/bloque-04/01-que-es-un-contenedor',
										},
										{
											label: '2. Docker es la herramienta',
											slug: 'materias/taller-integrador/bloque-04/02-docker-es-la-herramienta',
										},
										{
											label: '3. Los cinco conceptos fundamentales',
											slug: 'materias/taller-integrador/bloque-04/03-los-cinco-conceptos-fundamentales',
										},
										{
											label: '4. Operar Docker',
											slug: 'materias/taller-integrador/bloque-04/04-operar-docker',
										},
										{
											label: '5. Linux básico para trabajar con contenedores',
											slug: 'materias/taller-integrador/bloque-04/05-linux-basico',
										},
										{
											label: '6. Usuarios, grupos y permisos',
											slug: 'materias/taller-integrador/bloque-04/06-usuarios-grupos-y-permisos',
										},
										{
											label: '7. Arquitectura de Docker',
											slug: 'materias/taller-integrador/bloque-04/07-arquitectura-de-docker',
										},
										{
											label: '8. Construir nuestras propias imágenes',
											slug: 'materias/taller-integrador/bloque-04/08-construir-imagenes',
										},
										{
											label: '9. Docker Compose',
											slug: 'materias/taller-integrador/bloque-04/09-docker-compose',
										},
										{
											label: '10. Seguridad de contenedores',
											slug: 'materias/taller-integrador/bloque-04/10-seguridad-de-contenedores',
										},
										{
											label: '11. Del desarrollo al despliegue',
											slug: 'materias/taller-integrador/bloque-04/11-del-desarrollo-al-despliegue',
										},
										{
											label: '12. Escalabilidad y orquestación',
											slug: 'materias/taller-integrador/bloque-04/12-escalabilidad-y-orquestacion',
										},
										{
											label: '13. Aplicación integradora',
											slug: 'materias/taller-integrador/bloque-04/13-aplicacion-integradora',
										},
										{
											label: '14. Cierre y autoevaluación',
											slug: 'materias/taller-integrador/bloque-04/14-cierre-y-autoevaluacion',
										},
										{
											label: 'Guía de fundamentos de contenedores',
											slug: 'materias/taller-integrador/bloque-04/guia-fundamentos-contenedores',
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Primeros contenedores',
													slug: 'materias/taller-integrador/bloque-04/laboratorios/laboratorio-1-primeros-contenedores',
												},
												{
													label: 'Laboratorio 2 — Tu sistema en una imagen: Dockerfile',
													slug: 'materias/taller-integrador/bloque-04/laboratorios/laboratorio-2-dockerfile',
												},
												{
													label: 'Laboratorio 3 — Ambiente reproducible con Docker Compose',
													slug: 'materias/taller-integrador/bloque-04/laboratorios/laboratorio-3-docker-compose',
												},
												{
													label: 'Laboratorio 4 — Despliegue en un servidor con HTTPS',
													slug: 'materias/taller-integrador/bloque-04/laboratorios/laboratorio-4-despliegue',
												},
												{
													label: 'Laboratorio 5 — Pruebas de carga y análisis de capacidad',
													slug: 'materias/taller-integrador/bloque-04/laboratorios/laboratorio-5-pruebas-de-carga',
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
								{
									label: 'Unidad III — Ingeniería y planificación de pruebas',
									items: [
										{ label: 'Introducción', slug: 'materias/pruebas-software/unidad-03' },
										{
											label: 'Presentación',
											slug: 'materias/pruebas-software/unidad-03/presentacion',
										},
										{
											label: '1. Tipos y niveles de pruebas',
											slug: 'materias/pruebas-software/unidad-03/01-tipos-y-niveles-de-pruebas',
										},
										{
											label: '2. Técnicas de diseño: enfoques y casos de prueba',
											slug: 'materias/pruebas-software/unidad-03/02-tecnicas-de-diseno-enfoques-y-casos',
										},
										{
											label: '3. Técnicas de caja negra',
											slug: 'materias/pruebas-software/unidad-03/03-tecnicas-de-caja-negra',
										},
										{
											label: '4. Caja blanca y caja gris',
											slug: 'materias/pruebas-software/unidad-03/04-caja-blanca-y-caja-gris',
										},
										{
											label: '5. Pruebas exploratorias y basadas en riesgos',
											slug: 'materias/pruebas-software/unidad-03/05-pruebas-exploratorias-y-basadas-en-riesgos',
										},
										{
											label: '6. Planificación de pruebas',
											slug: 'materias/pruebas-software/unidad-03/06-planificacion-de-pruebas',
										},
										{
											label: '7. Estándares y documentación',
											slug: 'materias/pruebas-software/unidad-03/07-estandares-y-documentacion',
										},
										{
											label: '8. Cierre y resumen',
											slug: 'materias/pruebas-software/unidad-03/08-cierre-y-resumen',
										},
										{
											label: 'Formato del plan de pruebas',
											slug: 'materias/pruebas-software/unidad-03/formato-plan-pruebas',
										},
										{
											label: 'Laboratorios',
											items: [
												{
													label: 'Laboratorio 1 — Técnicas de caja negra',
													slug: 'materias/pruebas-software/unidad-03/laboratorios/laboratorio-1-tecnicas-caja-negra',
												},
												{
													label: 'Laboratorio 2 — Caja blanca: grafo, rutas y complejidad ciclomática',
													slug: 'materias/pruebas-software/unidad-03/laboratorios/laboratorio-2-caja-blanca-rutas',
												},
												{
													label: 'Laboratorio 3 — Plan de pruebas del proyecto integrador',
													slug: 'materias/pruebas-software/unidad-03/laboratorios/laboratorio-3-plan-de-pruebas',
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
				{
					label: 'Recursos',
					items: [
						{
							label: 'Estándares de desarrollo',
							items: [
								{ label: 'Presentación del handbook', slug: 'recursos/estandares' },
								{ label: '00 · Arquitectura documental', slug: 'recursos/estandares/00-indice-y-arquitectura-documental' },
								{ label: '01 · Estándar general', slug: 'recursos/estandares/01-estandar-general' },
								{ label: '02 · Backend Laravel/PHP', slug: 'recursos/estandares/02-estandar-backend-laravel' },
								{ label: '03 · Frontend', slug: 'recursos/estandares/03-estandar-frontend' },
								{ label: '04 · Bases de datos', slug: 'recursos/estandares/04-estandar-bases-de-datos' },
								{ label: '05 · APIs REST', slug: 'recursos/estandares/05-estandar-api-rest' },
								{ label: '06 · Git y control de versiones', slug: 'recursos/estandares/06-estandar-git' },
								{ label: '07 · Code review', slug: 'recursos/estandares/07-estandar-code-review' },
								{ label: '08 · Pruebas', slug: 'recursos/estandares/08-estandar-pruebas' },
								{ label: '09 · Seguridad', slug: 'recursos/estandares/09-estandar-seguridad' },
								{ label: '10 · Documentación', slug: 'recursos/estandares/10-estandar-documentacion' },
								{ label: '11 · Calidad y CI/CD', slug: 'recursos/estandares/11-estandar-calidad-cicd' },
								{ label: '12 · Definition of Done', slug: 'recursos/estandares/12-definition-of-done' },
								{ label: '13 · Checklists operativos', slug: 'recursos/estandares/13-checklists' },
								{ label: '16 · Plan de implementación por fases', slug: 'recursos/estandares/16-plan-implementacion' },
								{ label: '17 · 20 reglas de oro', slug: 'recursos/estandares/17-reglas-de-oro' },
								{ label: 'Archivos de configuración', slug: 'recursos/estandares/config-examples' },
							],
						},
					],
				},
			],
		}),
	],
});
