# ANON Credential Hub (simple edition)

A certificate verification site for ANON Global Foundation that runs entirely on free GitHub Pages.
No database, no server, nothing to install on your laptop.

## What is in this folder

| File | What it is |
|---|---|
| `index.html` | The public page. People type a certificate ID or scan a QR code and see the result. |
| `admin.html` | Your page. Fill in a form, get an ID, a link, a QR code and a small record file. |
| `data/` | The register. One small file per certificate, named after its ID. |
| `certs/` | Optional. Finished certificate images, named after the ID, shown on the public page. |
| `assets/config.js` | Organisation name, categories, colour themes and the LinkedIn caption. The only file to edit for changes. |
| `assets/logo.png` | Colour logo, used in the header and on light themes. |
| `assets/logo-white.png` | White logo, used on dark themes. |

**Everything lives in ONE repository.** The public page and the admin page both read the same `data`
folder, so do not split them into two repositories, and you never need a separate page or repository
per student. Each person's public link is simply your site address plus their ID, for example
`https://YOUR-USERNAME.github.io/credentials/?id=AGF-2026-INT-7K3Q9X`.

## Updating a site that is already live

Upload `index.html`, `admin.html`, `README.md` and the whole `assets` folder to the repository
(**Add file → Upload files**, drag them in, **Commit changes**). They replace the old ones.
Do not touch `data` or `certs`: your issued certificates stay exactly as they are.
If the page still looks old afterwards, wait two minutes and press Ctrl + Shift + R.

## One-time setup (about 10 minutes)

1. Sign in to GitHub and create a **new public repository**, for example `credentials`.
2. Open the folder so you can see `index.html`, `admin.html`, `assets`, `data` and `certs`. On the
   repository page choose **Add file → Upload files**, select all of those together and **drag them**
   onto the page (dragging is what keeps the folders), then press **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**,
   branch **main**, folder **/ (root)**, then **Save**.
4. After a minute or two your site is live at `https://YOUR-USERNAME.github.io/credentials/`.
   - Public page: `https://YOUR-USERNAME.github.io/credentials/`
   - Your page: `https://YOUR-USERNAME.github.io/credentials/admin.html` (bookmark it)

## Issuing a certificate

1. Open `admin.html` and fill in the form. The colour theme is picked from the category; change it if
   you like. Press **Create certificate ID**.
2. You get an ID such as `AGF-2026-INT-7K3Q9X`, the public link, and a QR code.
3. Press **Download record file**. Upload that file to the `data` folder on GitHub
   (**Add file → Upload files → Commit changes**). You can upload many files at once.
4. Download the QR code and place it, with the ID, on the certificate in Canva.
5. Optional: export the finished certificate as a JPG named after the ID
   (`AGF-2026-INT-7K3Q9X.jpg`) and upload it to the `certs` folder. It then appears on the
   verification page with a download button.
6. Press **Check whether it is live**, then send the recipient the link
   (**Copy message for recipient** writes the message for you).

## Issuing many certificates at once

1. On `admin.html` choose **Many at once**.
2. Fill the boxes with what the whole batch shares (programme, certificate title, date, category, theme).
3. Copy the rows from Excel or Google Sheets, heading row included, and paste them into the list box
   (or choose the saved CSV file). **Download a sample spreadsheet** gives you a ready file with every column.
   - Only `name` is required.
   - Each person can have their own `program`, `period`, `level`, `description` (what the certificate
     recognises) and `title`, so one list can mix 3-month, 6-month and 1-year interns and O, A and B levels.
   - Optional: `organization`, `date`, `theme` (write the theme's name, e.g. *White with green band*).
   - Headings can be written your way: "Level / grade", "Programme / event name" or
     "What the certificate recognises" are all understood. The check screen lists which columns it read.
   - An empty cell, or a column you leave out, is taken from the boxes on the page.
   - The category always comes from the box on the page, so make one list per category.
4. Press **Check the list**, review the table, then **Create N certificates**.
5. Press **Download everything (.zip)** and unzip it. It contains:
   - `data/` : one record file per person. Upload all of these files to the `data` folder on GitHub in one go.
   - `qr/` : one QR image per person, named with the person's name and ID.
   - `certificates.csv` : name, ID, public link and QR file name for every person (for your designer).

## Colour themes

Nine themes come built in. Each category has a default, set in `assets/config.js`:

| Theme | Default for |
|---|---|
| White with blue & red | Internship, Speaker / Guest, Other |
| Black & gold | Educators' Fellowship |
| Cream & gold | School / Institution |
| Navy blue & red | Workshop / Training |
| Green & gold | Volunteering / Leadership |
| Lavender & purple | Event / Competition |
| White with blue band | (pick by hand, e.g. one-year internships) |
| White with green band | (pick by hand, e.g. three-month internships) |
| Volunteer of the Year (crimson & gold) | (pick by hand; adds three gold stars under the title) |

For a Volunteer of the Year award, set the certificate title to **Volunteer of the Year** (it is in the
suggestions) and pick that theme. Any title of the form "X of Y" is shown as a big *X* with *of Y* under it.

The logo follows the background: the white logo on dark themes, the colour logo on light ones.
To change which theme a category gets, edit the `theme:` word on that category's line in `config.js`.
To add a new theme, copy one of the theme lines, give it a new `code` and `label`, and change the colours.
To change the theme of a certificate that is already issued, load it under
*Change or revoke an existing certificate*, pick the theme, and upload the record file again.

## Posting on LinkedIn (what recipients see)

On a valid certificate's page the **Post on LinkedIn** button opens three steps:

1. **Download image**: a square sticker of the certificate in its theme colours, with the logo,
   "Verified credential", the certificate ID and a QR code that leads back to the verification page.
2. **Copy caption and open LinkedIn**: a ready caption (editable) is copied and LinkedIn opens.
3. In LinkedIn the person adds the image and types `@ANON Global Foundation` to tag the page.

Two things LinkedIn does not allow any website to do: attach an image to someone's post for them,
and tag a page for them. That is why those two are done by the person, in a few seconds.
The wording of the caption and the line on the sticker are in `assets/config.js`
(`shareCaption` and `verifiedLine`).

## If a search says "Not found"

- **You opened `index.html` by double-clicking it on your computer.** Browsers do not allow a page opened
  that way to read the `data` folder. Use your `github.io` address instead.
- **The `data` folder is not in the repository**, or it is in a different repository from `index.html`.
  Check that `https://YOUR-USERNAME.github.io/credentials/data/AGF-2026-GEN-SAMPLE.json` opens.
- **The record was uploaded a moment ago.** Wait a minute or two and try again.

## Changing or revoking a certificate

On `admin.html`, under *Change or revoke an existing certificate*, enter the ID and press
**Load from site**. Change the details or set the status to **Revoked** (or **Superseded**, with the
ID of the replacement), press **Update**, download the record file again and upload it to `data`,
replacing the old one. The ID, link and QR code stay the same and now show the new status.

Do not delete a record to revoke it: a deleted record shows "Not found", a revoked one shows "Revoked".

## Adding a new category later

Open `assets/config.js` on GitHub, press the pencil icon, copy one of the category lines and give it a
new three-letter code, for example `{ code: 'AWD', label: 'Awards', theme: 'gold' },`. Commit. Done.

## Things to know

- **Everything in this repository is public**, because free GitHub Pages needs a public repository.
  Only put on a record what you are happy for anyone to read. No emails, phone numbers or private notes.
- **`admin.html` needs no password.** It only prepares files. Nothing becomes a real certificate
  until someone with access to your GitHub account uploads the record. Your GitHub login is the lock,
  so turn on two-factor authentication there.
- **IDs are random on purpose**, so nobody can guess other people's IDs by counting up.
- **Updates take a minute or two** to appear after you upload, and occasionally up to ten.
- **The register is the truth, not the image.** The page confirms that a record with that ID exists and
  shows who it was issued to. Verifiers should compare the name on the page with the certificate in hand.
- The list "Created in this browser" on the admin page is only a convenience and lives in that one
  browser. The `data` folder is the real register; GitHub keeps its full history.
