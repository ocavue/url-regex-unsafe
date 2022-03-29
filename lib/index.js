"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ipRegex = require('ip-regex');

var tlds = require('tlds');
/* istanbul ignore next */


var UnSafeRegExp = RegExp;
var ipv4 = ipRegex.v4().source;
var ipv6 = ipRegex.v6().source;

module.exports = function (options) {
  options = _objectSpread({
    exact: false,
    strict: false,
    auth: false,
    localhost: true,
    parens: false,
    apostrophes: false,
    trailingPeriod: false,
    ipv4: true,
    ipv6: true,
    tlds: tlds,
    returnString: false
  }, options);
  var protocol = "(?:(?:[a-z]+:)?//)".concat(options.strict ? '' : '?'); // Add option to disable matching urls with HTTP Basic Authentication
  // <https://github.com/kevva/url-regex/pull/63>

  var auth = options.auth ? '(?:\\S+(?::\\S*)?@)?' : '';
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"; // Add ability to pass custom list of tlds
  // <https://github.com/kevva/url-regex/pull/66>

  var tld = "(?:\\.".concat(options.strict ? "(?:[a-z\\u00a1-\\uffff]{2,})" : "(?:".concat(options.tlds.sort(function (a, b) {
    return b.length - a.length;
  }).join('|'), ")(?![a-z])"), ")").concat(options.trailingPeriod ? '\\.?' : '');
  var port = '(?::\\d{2,5})?'; // Not accept closing parenthesis
  // <https://github.com/kevva/url-regex/pull/35>
  // Don't allow apostrophes
  // <https://github.com/kevva/url-regex/pull/55>

  var path = options.parens ? options.apostrophes ? '(?:[/?#][^\\s"]*)?' : '(?:[/?#][^\\s"\']*)?' : options.apostrophes ? '(?:[/?#][^\\s"\\)]*)?' : '(?:[/?#][^\\s"\\)\']*)?'; // Added IPv6 support
  // <https://github.com/kevva/url-regex/issues/60>

  var regex = "(?:".concat(protocol, "|www\\.)").concat(auth, "(?:");
  if (options.localhost) regex += 'localhost|';
  if (options.ipv4) regex += "".concat(ipv4, "|");
  if (options.ipv6) regex += "".concat(ipv6, "|");
  regex += "".concat(host).concat(domain).concat(tld, ")").concat(port).concat(path); // Add option to return the regex string instead of a RegExp

  if (options.returnString) return regex;
  return options.exact ? new UnSafeRegExp("(?:^".concat(regex, "$)"), 'i') : new UnSafeRegExp(regex, 'ig');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpcFJlZ2V4IiwicmVxdWlyZSIsInRsZHMiLCJVblNhZmVSZWdFeHAiLCJSZWdFeHAiLCJpcHY0IiwidjQiLCJzb3VyY2UiLCJpcHY2IiwidjYiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImV4YWN0Iiwic3RyaWN0IiwiYXV0aCIsImxvY2FsaG9zdCIsInBhcmVucyIsImFwb3N0cm9waGVzIiwidHJhaWxpbmdQZXJpb2QiLCJyZXR1cm5TdHJpbmciLCJwcm90b2NvbCIsImhvc3QiLCJkb21haW4iLCJ0bGQiLCJzb3J0IiwiYSIsImIiLCJsZW5ndGgiLCJqb2luIiwicG9ydCIsInBhdGgiLCJyZWdleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXZCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7QUFFQTs7O0FBQ0EsSUFBTUUsWUFBWSxHQUFHQyxNQUFyQjtBQUNBLElBQU1DLElBQUksR0FBR0wsT0FBTyxDQUFDTSxFQUFSLEdBQWFDLE1BQTFCO0FBQ0EsSUFBTUMsSUFBSSxHQUFHUixPQUFPLENBQUNTLEVBQVIsR0FBYUYsTUFBMUI7O0FBRUFHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFDQyxPQUFELEVBQWE7QUFDNUJBLEVBQUFBLE9BQU87QUFDTEMsSUFBQUEsS0FBSyxFQUFFLEtBREY7QUFFTEMsSUFBQUEsTUFBTSxFQUFFLEtBRkg7QUFHTEMsSUFBQUEsSUFBSSxFQUFFLEtBSEQ7QUFJTEMsSUFBQUEsU0FBUyxFQUFFLElBSk47QUFLTEMsSUFBQUEsTUFBTSxFQUFFLEtBTEg7QUFNTEMsSUFBQUEsV0FBVyxFQUFFLEtBTlI7QUFPTEMsSUFBQUEsY0FBYyxFQUFFLEtBUFg7QUFRTGQsSUFBQUEsSUFBSSxFQUFFLElBUkQ7QUFTTEcsSUFBQUEsSUFBSSxFQUFFLElBVEQ7QUFVTE4sSUFBQUEsSUFBSSxFQUFKQSxJQVZLO0FBV0xrQixJQUFBQSxZQUFZLEVBQUU7QUFYVCxLQVlGUixPQVpFLENBQVA7QUFlQSxNQUFNUyxRQUFRLCtCQUF3QlQsT0FBTyxDQUFDRSxNQUFSLEdBQWlCLEVBQWpCLEdBQXNCLEdBQTlDLENBQWQsQ0FoQjRCLENBaUI1QjtBQUNBOztBQUNBLE1BQU1DLElBQUksR0FBR0gsT0FBTyxDQUFDRyxJQUFSLEdBQWUsc0JBQWYsR0FBd0MsRUFBckQ7QUFDQSxNQUFNTyxJQUFJLEdBQUcsK0RBQWI7QUFDQSxNQUFNQyxNQUFNLEdBQ1YsZ0VBREYsQ0FyQjRCLENBdUI1QjtBQUNBOztBQUNBLE1BQU1DLEdBQUcsbUJBQ1BaLE9BQU8sQ0FBQ0UsTUFBUixHQUNJLDhCQURKLGdCQUVVRixPQUFPLENBQUNWLElBQVIsQ0FDSHVCLElBREcsQ0FDRSxVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVQSxDQUFDLENBQUNDLE1BQUYsR0FBV0YsQ0FBQyxDQUFDRSxNQUF2QjtBQUFBLEdBREYsRUFFSEMsSUFGRyxDQUVFLEdBRkYsQ0FGVixlQURPLGNBTUxqQixPQUFPLENBQUNPLGNBQVIsR0FBeUIsTUFBekIsR0FBa0MsRUFON0IsQ0FBVDtBQVFBLE1BQU1XLElBQUksR0FBRyxnQkFBYixDQWpDNEIsQ0FrQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU1DLElBQUksR0FBR25CLE9BQU8sQ0FBQ0ssTUFBUixHQUNUTCxPQUFPLENBQUNNLFdBQVIsR0FDRSxvQkFERixHQUVFLHNCQUhPLEdBSVROLE9BQU8sQ0FBQ00sV0FBUixHQUNBLHVCQURBLEdBRUEseUJBTkosQ0F0QzRCLENBOEM1QjtBQUNBOztBQUNBLE1BQUljLEtBQUssZ0JBQVNYLFFBQVQscUJBQTRCTixJQUE1QixRQUFUO0FBQ0EsTUFBSUgsT0FBTyxDQUFDSSxTQUFaLEVBQXVCZ0IsS0FBSyxJQUFJLFlBQVQ7QUFDdkIsTUFBSXBCLE9BQU8sQ0FBQ1AsSUFBWixFQUFrQjJCLEtBQUssY0FBTzNCLElBQVAsTUFBTDtBQUNsQixNQUFJTyxPQUFPLENBQUNKLElBQVosRUFBa0J3QixLQUFLLGNBQU94QixJQUFQLE1BQUw7QUFDbEJ3QixFQUFBQSxLQUFLLGNBQU9WLElBQVAsU0FBY0MsTUFBZCxTQUF1QkMsR0FBdkIsY0FBOEJNLElBQTlCLFNBQXFDQyxJQUFyQyxDQUFMLENBcEQ0QixDQXNENUI7O0FBQ0EsTUFBSW5CLE9BQU8sQ0FBQ1EsWUFBWixFQUEwQixPQUFPWSxLQUFQO0FBRTFCLFNBQU9wQixPQUFPLENBQUNDLEtBQVIsR0FDSCxJQUFJVixZQUFKLGVBQXdCNkIsS0FBeEIsU0FBbUMsR0FBbkMsQ0FERyxHQUVILElBQUk3QixZQUFKLENBQWlCNkIsS0FBakIsRUFBd0IsSUFBeEIsQ0FGSjtBQUdELENBNUREIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaXBSZWdleCA9IHJlcXVpcmUoJ2lwLXJlZ2V4Jyk7XG5jb25zdCB0bGRzID0gcmVxdWlyZSgndGxkcycpO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgVW5TYWZlUmVnRXhwID0gUmVnRXhwO1xuY29uc3QgaXB2NCA9IGlwUmVnZXgudjQoKS5zb3VyY2U7XG5jb25zdCBpcHY2ID0gaXBSZWdleC52NigpLnNvdXJjZTtcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucykgPT4ge1xuICBvcHRpb25zID0ge1xuICAgIGV4YWN0OiBmYWxzZSxcbiAgICBzdHJpY3Q6IGZhbHNlLFxuICAgIGF1dGg6IGZhbHNlLFxuICAgIGxvY2FsaG9zdDogdHJ1ZSxcbiAgICBwYXJlbnM6IGZhbHNlLFxuICAgIGFwb3N0cm9waGVzOiBmYWxzZSxcbiAgICB0cmFpbGluZ1BlcmlvZDogZmFsc2UsXG4gICAgaXB2NDogdHJ1ZSxcbiAgICBpcHY2OiB0cnVlLFxuICAgIHRsZHMsXG4gICAgcmV0dXJuU3RyaW5nOiBmYWxzZSxcbiAgICAuLi5vcHRpb25zXG4gIH07XG5cbiAgY29uc3QgcHJvdG9jb2wgPSBgKD86KD86W2Etel0rOik/Ly8pJHtvcHRpb25zLnN0cmljdCA/ICcnIDogJz8nfWA7XG4gIC8vIEFkZCBvcHRpb24gdG8gZGlzYWJsZSBtYXRjaGluZyB1cmxzIHdpdGggSFRUUCBCYXNpYyBBdXRoZW50aWNhdGlvblxuICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL2tldnZhL3VybC1yZWdleC9wdWxsLzYzPlxuICBjb25zdCBhdXRoID0gb3B0aW9ucy5hdXRoID8gJyg/OlxcXFxTKyg/OjpcXFxcUyopP0ApPycgOiAnJztcbiAgY29uc3QgaG9zdCA9ICcoPzooPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV1bLV9dKikqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKyknO1xuICBjb25zdCBkb21haW4gPVxuICAgICcoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKSonO1xuICAvLyBBZGQgYWJpbGl0eSB0byBwYXNzIGN1c3RvbSBsaXN0IG9mIHRsZHNcbiAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS91cmwtcmVnZXgvcHVsbC82Nj5cbiAgY29uc3QgdGxkID0gYCg/OlxcXFwuJHtcbiAgICBvcHRpb25zLnN0cmljdFxuICAgICAgPyAnKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmZdezIsfSknXG4gICAgICA6IGAoPzoke29wdGlvbnMudGxkc1xuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKVxuICAgICAgICAgIC5qb2luKCd8Jyl9KSg/IVthLXpdKWBcbiAgfSkke29wdGlvbnMudHJhaWxpbmdQZXJpb2QgPyAnXFxcXC4/JyA6ICcnfWA7XG5cbiAgY29uc3QgcG9ydCA9ICcoPzo6XFxcXGR7Miw1fSk/JztcbiAgLy8gTm90IGFjY2VwdCBjbG9zaW5nIHBhcmVudGhlc2lzXG4gIC8vIDxodHRwczovL2dpdGh1Yi5jb20va2V2dmEvdXJsLXJlZ2V4L3B1bGwvMzU+XG4gIC8vIERvbid0IGFsbG93IGFwb3N0cm9waGVzXG4gIC8vIDxodHRwczovL2dpdGh1Yi5jb20va2V2dmEvdXJsLXJlZ2V4L3B1bGwvNTU+XG4gIGNvbnN0IHBhdGggPSBvcHRpb25zLnBhcmVuc1xuICAgID8gb3B0aW9ucy5hcG9zdHJvcGhlc1xuICAgICAgPyAnKD86Wy8/I11bXlxcXFxzXCJdKik/J1xuICAgICAgOiAnKD86Wy8/I11bXlxcXFxzXCJcXCddKik/J1xuICAgIDogb3B0aW9ucy5hcG9zdHJvcGhlc1xuICAgID8gJyg/OlsvPyNdW15cXFxcc1wiXFxcXCldKik/J1xuICAgIDogJyg/OlsvPyNdW15cXFxcc1wiXFxcXClcXCddKik/JztcblxuICAvLyBBZGRlZCBJUHY2IHN1cHBvcnRcbiAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS91cmwtcmVnZXgvaXNzdWVzLzYwPlxuICBsZXQgcmVnZXggPSBgKD86JHtwcm90b2NvbH18d3d3XFxcXC4pJHthdXRofSg/OmA7XG4gIGlmIChvcHRpb25zLmxvY2FsaG9zdCkgcmVnZXggKz0gJ2xvY2FsaG9zdHwnO1xuICBpZiAob3B0aW9ucy5pcHY0KSByZWdleCArPSBgJHtpcHY0fXxgO1xuICBpZiAob3B0aW9ucy5pcHY2KSByZWdleCArPSBgJHtpcHY2fXxgO1xuICByZWdleCArPSBgJHtob3N0fSR7ZG9tYWlufSR7dGxkfSkke3BvcnR9JHtwYXRofWA7XG5cbiAgLy8gQWRkIG9wdGlvbiB0byByZXR1cm4gdGhlIHJlZ2V4IHN0cmluZyBpbnN0ZWFkIG9mIGEgUmVnRXhwXG4gIGlmIChvcHRpb25zLnJldHVyblN0cmluZykgcmV0dXJuIHJlZ2V4O1xuXG4gIHJldHVybiBvcHRpb25zLmV4YWN0XG4gICAgPyBuZXcgVW5TYWZlUmVnRXhwKGAoPzpeJHtyZWdleH0kKWAsICdpJylcbiAgICA6IG5ldyBVblNhZmVSZWdFeHAocmVnZXgsICdpZycpO1xufTtcbiJdfQ==